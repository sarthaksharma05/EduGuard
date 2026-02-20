import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-gray-100">
      <div className="container mx-auto px-6 lg:px-8 py-8 text-center text-sm text-slate-600">
        <div className="mb-2">© {new Date().getFullYear()} EduGuard AI. All rights reserved.</div>
        <div>
          <a className="mx-2 hover:text-indigo-600" href="/terms">Terms</a>
          <a className="mx-2 hover:text-indigo-600" href="/privacy">Privacy</a>
        </div>
      </div>
    </footer>
  )
}
