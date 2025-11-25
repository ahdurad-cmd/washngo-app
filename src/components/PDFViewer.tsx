type Props = { src: string }
export default function PDFViewer({ src }: Props){
  return (
    <div className="w-full h-[800px] bg-white">
      <iframe src={src} className="w-full h-full" />
    </div>
  )
}
