import _template from 'lodash.template'

export function compileCustomSlots(instance: HTMLElement, template: string) {
  const children = Array.from(instance.children);
  const data = children.reduce((prev, curr, index) => {
    console.log(prev, curr, index)
    const slot = curr.getAttribute('slot')
    if (!slot) return {...prev, "default": curr.outerHTML}

    return {...prev, [slot]: curr.outerHTML}
  }, {} as any)

  const compiled = _template(template)
  return compiled({data})
}
