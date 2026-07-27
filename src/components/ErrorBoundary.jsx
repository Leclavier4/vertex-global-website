import { Component } from 'react'

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
      return (
        <div className="flex min-h-[160px] items-center justify-center bg-vertex-off-white px-6 text-center text-sm text-vertex-text-muted">
          Une erreur est survenue lors de l&apos;affichage de cette section.
        </div>
      )
    }

    return this.props.children
  }
}
