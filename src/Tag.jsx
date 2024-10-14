export default function Tag({ image, title = null, children }) {
  return (
    <div className="flex flex-col size-24 menu rounded justify-center items-center" title={title}>
      {
        image &&
        (
          <div className="size-12">
            <img src={image} />
          </div>
        )
      }
      {children}
    </div>
  )
}