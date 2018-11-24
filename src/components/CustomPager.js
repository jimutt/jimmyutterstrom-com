/*
Custom pager component based on the default Pager in Gridsome, but without numbering. (only support for next and previous)
*/
import { Link } from 'gridsome'

export default {
  functional: true,

  props: {
    info: { type: Object, required: true },
    showLinks: { type: Boolean, default: true },
    showNavigation: { type: Boolean, default: true },
    prevLabel: { type: String, default: '‹' },
    nextLabel: { type: String, default: '›' },
    linkClass: { type: String, default: '' },
    nextClass: { type: String, default: '' },
    prevClass: { type: String, default: '' },

    // accessibility
    ariaLabel: { type: String, default: 'Pagination Navigation' },
    ariaLinkLabel: { type: String, default: 'Go to page %n' },
    ariaCurrentLabel: { type: String, default: 'Current page. Page %n' },
    ariaPrevLabel: { type: String, default: 'Go to previous page. Page %n' },
    ariaNextLabel: { type: String, default: 'Go to next page. Page %n' }
  },

  render: (h, { props, data }) => {
    const { info, showLinks, showNavigation, ariaLabel } = props
    const { current, total } = resolveRange(info)

    const renderLink = (
      page,
      text = page,
      ariaLabel = text,
      linkClass = props.linkClass
    ) => {
      if (page === current) ariaLabel = props.ariaCurrentLabel

      return h(
        Link,
        {
          staticClass: linkClass,
          props: { page },
          attrs: {
            'aria-label': ariaLabel.replace('%n', page),
            'aria-current': current === page
          }
        },
        [text]
      )
    }

    const links = []

    // render first, prev, next and last links
    if (showNavigation) {
      const { prevLabel, nextLabel } = props
      const { ariaPrevLabel, ariaNextLabel } = props

      if (current > 1)
        links.push(
          renderLink(current - 1, prevLabel, ariaPrevLabel, props.prevClass)
        )

      if (current < total)
        links.push(
          renderLink(current + 1, nextLabel, ariaNextLabel, props.nextClass)
        )
    }

    if (links.length < 1) return null

    return h(
      'nav',
      {
        ...data,
        attrs: {
          role: 'navigation',
          'aria-label': ariaLabel
        }
      },
      links
    )
  }
}

function resolveRange({ currentPage: current = 1, totalPages: total = 1 }) {
  const length = 10
  const offset = Math.ceil(length / 2)

  let start = current - offset
  let end = current + offset

  if (total <= length) {
    start = 0
    end = total
  } else if (current <= offset) {
    start = 0
    end = length
  } else if (current + offset >= total) {
    start = total - length
    end = total
  }

  const pages = []

  for (let page = start + 1; page <= end; page++) {
    pages.push(page)
  }

  return { current, total, start, end, pages }
}
