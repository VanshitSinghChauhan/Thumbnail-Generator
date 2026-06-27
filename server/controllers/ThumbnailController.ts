import { Request, Response } from "express";
import Thumbnail from "../models/Thumbnail.js";
import { GenerateContentConfig, HarmBlockThreshold, HarmCategory } from "@google/genai";
import ai from "../configs/ai.js";
import path from "path";
import fs from "fs";
import {v2 as cloudinary} from 'cloudinary'

const stylePrompts = {
    'Bold $ Graphic':'eye-catching thumbnail, bold typography, vibrant colors, expressive facial reaction, dramatic lighting, high contrast, click-worthy composition, professional style',
    'Tech/ Futuristic': 'futuristic thumbnail, sleek modern design,digital UI elements, glowing accents, holographic effects, cyber-tech aesthetic, sharp lighting, high-tech atmosphere' ,
    'Minimalist': 'minimalist thumbnail, clean layout, simple shapes, limited color palette, plenty of negative space, modern flat design, clear focal point' ,
    'Photorealistic': 'photorealistic thumbnail, ultra-realistic lighting, natural skin tones, candid moment, DSLR-sty1e photography, lifestyle realism, shallow depth of field' ,'Illustrated': 'illustrated thumbnail, custom digitalillustration, stylized characters, bold outlines, vibrant colors, creative cartoon or vector art style'

}

const colorSchemeDescriptions = {
    vibrant: 'vibrant and energetic colors, high saturation, bold contrast, eye catching palette',
    sunset: 'warm twilight aesthetic, radiant orange and violet gradients, golden hour cinematic glow, soft ambient lighting',
    forest: 'lush organic greens, moss and earth-toned palette, serene wilderness atmosphere, diffused natural canopy lighting',
    neon: 'vibrant cyberpunk glow, electric magenta and cyan highlights, high-contrast dark synthwave aesthetic, striking luminescent accents',
    purple: 'deep violet-dominant color scheme, sleek magenta and amethyst tones, moody contemporary atmosphere, stylish high-end aesthetic',
    monochrome: 'timeless black and white scheme, stark high-contrast shadows, dramatic chiascuro lighting, classic cinematic aesthetic',
    ocean: 'cool teal and deep aquamarine tones, refreshing maritime palette, crisp clean lighting, serene underwater atmosphere',
    pastel: 'soft muted pastel palette, low-saturation dreamlike colors, gentle desaturated tones, calm and inviting minimalist aesthetic'
}
export const generateThumbnail = async (req: Request,res: Response)=>{
    try {
        const {userId} = req.session;
        const  {
            title,
            prompt: user_prompt,
            style,
            aspect_ratio,
            color_scheme,
            text_overlay
        } = req.body

        const thumbnail = await Thumbnail.create({
            userId,
            title,
            prompt_used: user_prompt,
            user_prompt,
            style,
            aspect_ratio,
            color_scheme,
            text_overlay,
            isGenerating: true

        })

        const model = 'gemini-3-pro-image-preview';
        const generationConfig: GenerateContentConfig = {
            maxOutputTokens: 32768,
            temperature: 1,
            topP: 0.95,
            responseModalities: ['IMAGE'],
            imageConfig: {
                aspectRatio: aspect_ratio || '16:9',
                imageSize: '1K'
            },
            safetySettings: [
                { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.OFF},
                { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.OFF},
                { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.OFF},
                { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.OFF},
            ]
        }

        let prompt = `Create a ${stylePrompts[style as keyof typeof stylePrompts]} for: "${title}"`;

        if(color_scheme){
            prompt += `Use a ${colorSchemeDescriptions[color_scheme as keyof typeof colorSchemeDescriptions]} color scheme.`

        }

        if(user_prompt){
            prompt +=  `Additional details : ${user_prompt}`
        }

        prompt += `The thumbnail should be ${aspect_ratio}, visually stunning, and designed to maximize click-through rate. Make it bold, professional and impossible to ignore`


        //Generating Image
        const response: any = await ai.models.generateContent({
            model,
            contents : [prompt],
            config: generationConfig
        })

        if(!response?.candidates?.[0]?.content?.parts){
            throw new Error('Unexpected response')
        }

        const parts = response.candidates[0].content.parts;
        let finalBuffer: Buffer | null = null;
        for(const part of parts){
            if(part.inlineData){
                finalBuffer = Buffer.from(part.inlineData.data, 'base64')
            }
        }
        const filename = `final-output-${Date.now()}.png`;
        const filepath = path.join('images', filename);

        fs.mkdirSync('images', {recursive: true})

        fs.writeFileSync(filepath, finalBuffer!);

        const uploadResult = await cloudinary.uploader.upload(filepath, {resource_type: 'image'})

        thumbnail.image_url = uploadResult.url;
        thumbnail.isGenerating = false
        await thumbnail.save()

        res.json({message: 'Thumbnail Generated', thumbnail})

        fs.unlinkSync(filepath)
    } catch (error: any) {
        console.log(error);
        res.status(500).json({message: error.message});
        
    }

}