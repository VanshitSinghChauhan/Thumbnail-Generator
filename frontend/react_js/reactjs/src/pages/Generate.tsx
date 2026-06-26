import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import {type IThumbnail, type AspectRatio, colorSchemes, type ThumbnailStyle, dummyThumbnails} from  "../assets/assets"
import SoftBackdrop from "../components/SoftBackdrop"
import AspectRatioSelector from "../components/AspectRatioSelector"
import StyleSelector from "../components/StyleSelector"
import ColorSchemeSelector from "../components/ColorSchemeSelector"
import PreviewPanel from "../components/PreviewPanel"


const Generate = () => {
  
  const {id} = useParams()
  const [title, setTitle] = useState('')
  const [additionalDetails, setAdditionalDetails] = useState('')
  const [thumbnail, setThumbnail] = useState<IThumbnail | null>(null)
  const [loading, setLoading] = useState(false)

  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9')
  const [colorSchemeId, setColorSchemeId] = useState<string>(colorSchemes[0].id)
  const [style, setStyle] = useState<ThumbnailStyle>('Bold &  Graphic')


  const [styleDialogOpen, setStyleDialogOpen] = useState(false)

  const handleGenerate = async ()=>{

  }
  
  const fetchThumbnail = async() => {
    if (id){
      const thumbnail : any = dummyThumbnails.find((thumbnail)=>thumbnail._id === id);
      setThumbnail(thumbnail)
      setAdditionalDetails(thumbnail.user_prompt)
      setTitle(thumbnail.title)
      setColorSchemeId(thumbnail.color_scheme)
      setAspectRatio(thumbnail.aspect_ratio)
      setStyle(thumbnail.style)
      setLoading(false)
    }
  }

  useEffect(()=>{
    if(id){
      fetchThumbnail()
    }
  },[id])

  return (
    <>
      <div className="pt-24 min-h-screen">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 lg:pb-8">
          <div className="grid lg:grid-cols-[400px_1fr] gap-8">
            {/* Left Panel*/}
            <div className={`space-y-6  ${id && 'pointer-events-none'}`}>
              <div className="p-6 rounded-2xl bg-white/8 border border-white/12 shadow-xl space-y-6">
                <div className="">
                  <h2 className="text-xl font-bold text-zinc-100 mb-1">Create Your Thumbnail</h2>
                  <p className="text-sm text-zinc-400">Describe your vision and let AI bring it to life!</p>
                </div>
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-zinc-300">Title</label>
                    <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} maxLength={100} placeholder="e.g., 5 Habits For Better Health" className="w-full px-4 py-3 rounded-lg border border-white/12 bg-black/20 text-zinc-100 placeholder-text-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500"/>
                    <div className="flex justify-end">
                      <span className="text-xs text-zinc-400">{title.length}/100</span>
                    </div>
                  </div>


                  <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio}/>


                  <StyleSelector value={style} onChange={setStyle} isOpen={styleDialogOpen} setIsOpen={setStyleDialogOpen}/>


                  <ColorSchemeSelector value={colorSchemeId} onChange={setColorSchemeId}/>


                  <div className="space-y-2">
                    <label className="block text-sm font-medium ">
                      Additional Prompts <span className="text-zinc-400 text-xs">(optional)</span>
                    </label>
                    <textarea value={additionalDetails} onChange={(e)=>setAdditionalDetails(e.target.value)} maxLength={500} rows={3} placeholder="e.g., Include vibrant colors, a person exercising, and a clean layout." className="w-full px-4 py-3 rounded-lg border border-white/12 bg-black/20 text-zinc-100 placeholder-text-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"/>
                  </div>
                </div>

                
                  {/*Button*/}
                {!id && (
                  <button onClick={handleGenerate} className="text-[15px] w-full py-3.5 rounded-xl font-medium bg-gradient-to-b from-orange-500 to-orange-600 hover:from-orange-700 disabled:cursor-not-allowed transition-colors">
                    {loading ? 'Generating...' : 'Generate Thumbnail'}
                  </button>
                )}

                
              </div>
            </div>
            {/*Right Panel */}
            <div>
              <div className="p-6 rounded-2xl bg-white/8 border border-white/10 shadow-xl">
                <h2 className="text-lg font-semibold text-zinc-100 mb-4">Preview</h2>
                <PreviewPanel thumbnail={thumbnail} isLoading={loading} aspectRatio={aspectRatio}/>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default Generate