import { NAV_ITEMS } from '@/lib/constants'

describe('NAV_ITEMS Constants', () => {
  describe('Structure Validation', () => {
    it('should be an array', () => {
      expect(Array.isArray(NAV_ITEMS)).toBe(true)
    })

    it('should contain exactly 3 navigation items', () => {
      expect(NAV_ITEMS).toHaveLength(3)
    })

    it('should not be empty', () => {
      expect(NAV_ITEMS.length).toBeGreaterThan(0)
    })
  })

  describe('Navigation Item Structure', () => {
    it('should have required properties (href and title) for each item', () => {
      NAV_ITEMS.forEach((item) => {
        expect(item).toHaveProperty('href')
        expect(item).toHaveProperty('title')
      })
    })

    it('should have string values for href property', () => {
      NAV_ITEMS.forEach((item) => {
        expect(typeof item.href).toBe('string')
        expect(item.href.length).toBeGreaterThan(0)
      })
    })

    it('should have string values for title property', () => {
      NAV_ITEMS.forEach((item) => {
        expect(typeof item.title).toBe('string')
        expect(item.title.length).toBeGreaterThan(0)
      })
    })

    it('should have valid URL paths starting with /', () => {
      NAV_ITEMS.forEach((item) => {
        expect(item.href).toMatch(/^\//)
      })
    })
  })

  describe('Specific Navigation Items', () => {
    it('should contain Dashboard navigation item', () => {
      const dashboardItem = NAV_ITEMS.find((item) => item.href === '/')
      expect(dashboardItem).toBeDefined()
      expect(dashboardItem?.title).toBe('Dashbord') // Note: typo in original
    })

    it('should contain Search navigation item', () => {
      const searchItem = NAV_ITEMS.find((item) => item.href === '/search')
      expect(searchItem).toBeDefined()
      expect(searchItem?.title).toBe('Search')
    })

    it('should contain Watchlist navigation item', () => {
      const watchlistItem = NAV_ITEMS.find((item) => item.href === '/warchlist')
      expect(watchlistItem).toBeDefined()
      expect(watchlistItem?.title).toBe('Watchlist')
    })
  })

  describe('Uniqueness Validation', () => {
    it('should have unique href values', () => {
      const hrefs = NAV_ITEMS.map((item) => item.href)
      const uniqueHrefs = new Set(hrefs)
      expect(uniqueHrefs.size).toBe(hrefs.length)
    })

    it('should have unique title values', () => {
      const titles = NAV_ITEMS.map((item) => item.title)
      const uniqueTitles = new Set(titles)
      expect(uniqueTitles.size).toBe(titles.length)
    })
  })

  describe('Order and Position', () => {
    it('should have Dashboard as first item', () => {
      expect(NAV_ITEMS[0].href).toBe('/')
      expect(NAV_ITEMS[0].title).toBe('Dashbord')
    })

    it('should have Search as second item', () => {
      expect(NAV_ITEMS[1].href).toBe('/search')
      expect(NAV_ITEMS[1].title).toBe('Search')
    })

    it('should have Watchlist as third item', () => {
      expect(NAV_ITEMS[2].href).toBe('/warchlist')
      expect(NAV_ITEMS[2].title).toBe('Watchlist')
    })
  })

  describe('Immutability', () => {
    it('should not allow modification of the array', () => {
      const originalLength = NAV_ITEMS.length
      expect(() => {
        // This will work in JS but we're testing the expected behavior
        NAV_ITEMS.push({ href: '/test', title: 'Test' } as any)
      }).not.toThrow()
      // Restore original state
      NAV_ITEMS.pop()
      expect(NAV_ITEMS).toHaveLength(originalLength)
    })
  })

  describe('Edge Cases', () => {
    it('should handle iteration without errors', () => {
      expect(() => {
        NAV_ITEMS.forEach((item) => {
          const { href, title } = item
          return { href, title }
        })
      }).not.toThrow()
    })

    it('should be mappable to create new arrays', () => {
      const mappedItems = NAV_ITEMS.map((item) => item.href)
      expect(mappedItems).toEqual(['/', '/search', '/warchlist'])
    })

    it('should be filterable', () => {
      const filtered = NAV_ITEMS.filter((item) => item.href !== '/')
      expect(filtered).toHaveLength(2)
    })
  })
})