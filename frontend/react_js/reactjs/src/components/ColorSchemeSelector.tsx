import { colorSchemes } from "../assets/assets"

const ColorSchemeSelector = ({value, onChange} : {value: string; onChange: (scheme: string) => void}) => {
  return (
    <div className='space-y-3'>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Color Scheme</label>
        <div className="grid grid-cols-6 gap-3">
            {colorSchemes.map((scheme) => (
                <button
                    key={scheme.id}
                    type="button"
                    onClick={() => onChange(scheme.id)}
                    className={`relative rounded-lg transition-all ${
                        value === scheme.id
                        //&& 'ring-2 ring-orange-500'
                            ? "border-blue-500 ring-2 ring-blue-500"
                            : "border-gray-300 hover:border-gray-400"
                    }`}
                    title={scheme.name}>
                        <div className="flex h-10 rounded-lg overflow-hidden">
                            {scheme.colors.map((color, index) => (
                                <div key={index} className="flex-1" style={{ backgroundColor: color }}></div>
                            ))}
                        </div>
                </button>
            ))}
        </div>
        <p className="text-xs text-gray-400">Selected: {colorSchemes.find((s) => s.id === value)?.name || "None"}</p>
    </div>
  )
}

export default ColorSchemeSelector