import React from 'react'
import { render, screen } from '@testing-library/react'
import Layout from '@/app/(root)/layout'

// Mock Header component
jest.mock('@/components/header', () => {
  return function Header() {
    return <header data-testid="header">Header Component</header>
  }
})

describe('Root Layout Component', () => {
  const mockChildren = <div data-testid="mock-children">Test Content</div>

  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(<Layout>{mockChildren}</Layout>)
      expect(screen.getByRole('main')).toBeInTheDocument()
    })

    it('should render main element', () => {
      render(<Layout>{mockChildren}</Layout>)
      const main = screen.getByRole('main')
      expect(main).toBeInTheDocument()
    })

    it('should render Header component', () => {
      render(<Layout>{mockChildren}</Layout>)
      expect(screen.getByTestId('header')).toBeInTheDocument()
    })

    it('should render children content', () => {
      render(<Layout>{mockChildren}</Layout>)
      expect(screen.getByTestId('mock-children')).toBeInTheDocument()
    })
  })

  describe('Layout Structure', () => {
    it('should have correct main element styling', () => {
      render(<Layout>{mockChildren}</Layout>)
      const main = screen.getByRole('main')
      expect(main).toHaveClass('min-h-screen', 'text-gray-400')
    })

    it('should wrap children in container with padding', () => {
      const { container } = render(<Layout>{mockChildren}</Layout>)
      const contentContainer = container.querySelector('.container.py-10')
      expect(contentContainer).toBeInTheDocument()
    })

    it('should render Header before children', () => {
      const { container } = render(<Layout>{mockChildren}</Layout>)
      const main = container.querySelector('main')
      const children = main?.children
      
      expect(children?.[0]).toContainElement(screen.getByTestId('header'))
      expect(children?.[1]).toContainElement(screen.getByTestId('mock-children'))
    })
  })

  describe('Container Styling', () => {
    it('should have container class on children wrapper', () => {
      const { container } = render(<Layout>{mockChildren}</Layout>)
      const wrapper = screen.getByTestId('mock-children').parentElement
      expect(wrapper).toHaveClass('container')
    })

    it('should have py-10 padding class', () => {
      const { container } = render(<Layout>{mockChildren}</Layout>)
      const wrapper = screen.getByTestId('mock-children').parentElement
      expect(wrapper).toHaveClass('py-10')
    })
  })

  describe('Children Handling', () => {
    it('should render single child component', () => {
      const child = <div data-testid="single-child">Single Child</div>
      render(<Layout>{child}</Layout>)
      expect(screen.getByTestId('single-child')).toBeInTheDocument()
    })

    it('should render multiple children', () => {
      const children = (
        <>
          <div data-testid="child-1">Child 1</div>
          <div data-testid="child-2">Child 2</div>
        </>
      )
      render(<Layout>{children}</Layout>)
      expect(screen.getByTestId('child-1')).toBeInTheDocument()
      expect(screen.getByTestId('child-2')).toBeInTheDocument()
    })

    it('should render text children', () => {
      render(<Layout>Plain text content</Layout>)
      expect(screen.getByText('Plain text content')).toBeInTheDocument()
    })

    it('should render complex nested children', () => {
      const complexChildren = (
        <div data-testid="complex">
          <h1>Title</h1>
          <p>Paragraph</p>
          <div>
            <span>Nested content</span>
          </div>
        </div>
      )
      render(<Layout>{complexChildren}</Layout>)
      expect(screen.getByTestId('complex')).toBeInTheDocument()
      expect(screen.getByText('Title')).toBeInTheDocument()
      expect(screen.getByText('Paragraph')).toBeInTheDocument()
    })
  })

  describe('Semantic HTML', () => {
    it('should use semantic main element', () => {
      render(<Layout>{mockChildren}</Layout>)
      expect(screen.getByRole('main')).toBeInTheDocument()
    })

    it('should maintain proper document structure', () => {
      const { container } = render(<Layout>{mockChildren}</Layout>)
      const main = container.querySelector('main')
      expect(main?.querySelector('header')).toBeTruthy()
      expect(main?.querySelector('.container')).toBeTruthy()
    })
  })

  describe('TypeScript Props', () => {
    it('should accept ReactNode as children', () => {
      const variousChildren = [
        <div key="1">Div child</div>,
        <span key="2">Span child</span>,
        'String child',
        123,
        null,
        undefined,
      ]
      
      variousChildren.forEach((child) => {
        expect(() => render(<Layout>{child}</Layout>)).not.toThrow()
      })
    })
  })

  describe('Edge Cases', () => {
    it('should handle null children', () => {
      render(<Layout>{null}</Layout>)
      expect(screen.getByRole('main')).toBeInTheDocument()
      expect(screen.getByTestId('header')).toBeInTheDocument()
    })

    it('should handle undefined children', () => {
      render(<Layout>{undefined}</Layout>)
      expect(screen.getByRole('main')).toBeInTheDocument()
    })

    it('should handle empty children', () => {
      render(<Layout>{''}</Layout>)
      expect(screen.getByRole('main')).toBeInTheDocument()
    })

    it('should handle boolean children', () => {
      render(<Layout>{false}</Layout>)
      expect(screen.getByRole('main')).toBeInTheDocument()
    })
  })

  describe('Styling Consistency', () => {
    it('should have min-h-screen for full viewport height', () => {
      render(<Layout>{mockChildren}</Layout>)
      const main = screen.getByRole('main')
      expect(main).toHaveClass('min-h-screen')
    })

    it('should have consistent text color', () => {
      render(<Layout>{mockChildren}</Layout>)
      const main = screen.getByRole('main')
      expect(main).toHaveClass('text-gray-400')
    })
  })

  describe('Integration', () => {
    it('should integrate Header component correctly', () => {
      render(<Layout>{mockChildren}</Layout>)
      const header = screen.getByTestId('header')
      const main = screen.getByRole('main')
      expect(main).toContainElement(header)
    })

    it('should maintain layout structure with different children', () => {
      const { rerender } = render(<Layout><div>First</div></Layout>)
      expect(screen.getByText('First')).toBeInTheDocument()
      
      rerender(<Layout><div>Second</div></Layout>)
      expect(screen.getByText('Second')).toBeInTheDocument()
      expect(screen.queryByText('First')).not.toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have accessible main landmark', () => {
      render(<Layout>{mockChildren}</Layout>)
      expect(screen.getByRole('main')).toBeInTheDocument()
    })

    it('should maintain proper heading hierarchy when children have headings', () => {
      const childrenWithHeadings = (
        <>
          <h1>Main Title</h1>
          <h2>Subtitle</h2>
        </>
      )
      render(<Layout>{childrenWithHeadings}</Layout>)
      expect(screen.getByText('Main Title')).toBeInTheDocument()
      expect(screen.getByText('Subtitle')).toBeInTheDocument()
    })
  })
})