import { Component } from 'react'
import { translations } from '../i18n/translations'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      const lang = typeof window !== 'undefined' && window.localStorage.getItem('vertex-lang') === 'en' ? 'en' : 'fr'

      return (
        <div className="flex min-h-[160px] items-center justify-center bg-vertex-off-white px-6 text-center text-sm text-vertex-text-muted">
          {translations[lang].errorBoundary}
        </div>
      )
    }

    return this.props.children
  }
}
