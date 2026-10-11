// Lee un archivo del input. Las imágenes se reducen (máx. 900 px) para que quepan en localStorage.
export function readFile(file, maxSize = 900) {
  return new Promise((resolve) => {
    const base = { name: file.name, size: file.size, type: file.type }

    if (!file.type.startsWith('image/')) {
      resolve(base)
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      const image = new Image()
      image.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(image.width, image.height))
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(image.width * scale)
        canvas.height = Math.round(image.height * scale)
        canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height)
        resolve({ ...base, url: canvas.toDataURL('image/jpeg', 0.82) })
      }
      image.onerror = () => resolve(base)
      image.src = reader.result
    }
    reader.onerror = () => resolve(base)
    reader.readAsDataURL(file)
  })
}

export function formatFileSize(bytes = 0) {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1).replace('.', ',')} MB`
  return `${Math.max(1, Math.round(bytes / 1024))} KB`
}
