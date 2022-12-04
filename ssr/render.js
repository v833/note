function render(node, renderAs = 'dom', path = []) {
  const { name, props, children } = node
  if (renderAs === 'dom') {
    const el = document.createElement(name)
    if (props && props.onClick) {
      el.addEventListener('click', props.onClick)
    }
    if (typeof children === 'string') {
      el.textContent = children
    } else if (Array.isArray(children)) {
      children.forEach((child, i) => {
        el.appendChild(render(child, renderAs, path.concat(i)))
      })
    }
    return el
  } else if (renderAs === 'html') {
    const html = `<${name} ${Object.keys(props || {})
      .map((key) => `${key}="${props[key]}"`)
      .join(' ')}>${children}</${name}>`
    return html
  }
}

module.exports = render
