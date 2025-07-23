import { useCallback, useEffect, useState } from 'react'

interface SectionOffsetInterface {
  id: string
  label: string
  offsetTop?: number
  items?: SectionOffsetInterface[]
}

interface UseScrollSpyParamsInterface {
  contentRef: React.RefObject<HTMLDivElement>
  sectionMenu: SectionOffsetInterface[]
  marginOffset?: number
  initialActiveSection?: string | null
}

export const useScrollSpy = ({
  contentRef,
  sectionMenu,
  marginOffset = 48,
  initialActiveSection = null
}: UseScrollSpyParamsInterface) => {
  const [activeSection, setActiveSection] = useState(initialActiveSection)
  const [activeSubSection, setActiveSubSection] = useState<string | null>(null)

  const handleScrollToActiveSection = useCallback(
    (id: string) => {
      const section = document.getElementById(id)

      if (section) {
        contentRef.current?.scrollTo({
          top: section.offsetTop - contentRef.current.offsetTop,
          behavior: 'smooth'
        })
      }
    },
    [contentRef]
  )

  useEffect(() => {
    const scrollElement = contentRef.current
    if (!scrollElement) return

    const sectionsOffsets = sectionMenu.map((menu) => {
      const element = document.getElementById(menu.label)
      const sectionsOffset = {
        ...menu,
        id: menu.id,
        offsetTop: element?.offsetTop ? element.offsetTop - scrollElement.offsetTop : 0
      }

      if (menu.items) {
        sectionsOffset.items = menu.items.map((item) => {
          const itemElement = document.getElementById(item.label)
          return {
            ...item,
            offsetTop: itemElement?.offsetTop ? itemElement.offsetTop - scrollElement.offsetTop : 0
          }
        })
      }

      return sectionsOffset
    })

    const handleScroll = () => {
      const scrollPosition = scrollElement.scrollTop + marginOffset

      const findActiveSection = (sections: typeof sectionsOffsets) => {
        return sections.find((section, index) => {
          const nextSection = sections[index + 1]
          return scrollPosition >= section.offsetTop && (!nextSection || scrollPosition < nextSection.offsetTop)
        })
      }

      const currentSection = findActiveSection(sectionsOffsets)

      if (!currentSection) return

      setActiveSection(currentSection.id)

      if (currentSection.items) {
        const currentSubSection = findActiveSection((currentSection.items as typeof sectionsOffsets) || [])

        if (currentSubSection) setActiveSubSection(currentSubSection.id)
      } else {
        setActiveSubSection(null)
      }
    }

    scrollElement.addEventListener('scroll', handleScroll)
    return () => scrollElement.removeEventListener('scroll', handleScroll)
  }, [contentRef, sectionMenu, marginOffset])

  return { activeSection, activeSubSection, handleScrollToActiveSection }
}
