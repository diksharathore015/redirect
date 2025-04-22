"use client"; // This ensures it runs on the client side
import React, { Component, ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (window.location.href = "/");
      //   return (
      //     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black p-4">
      //       <h1 className="text-4xl font-semibold mb-4">Something went wrong.</h1>
      //       <p className="text-lg mb-6">
      //         We're sorry, an error has occurred. Please try again later.
      //       </p>
      //       <a  href="/" className="text-blue-500 text-xl">
      //         Go back to Home
      //       </a>
      //       <div className="mt-8">
      //         <h2 className="text-2xl font-medium mb-2">Contact Us</h2>
      //         <p className="mb-4">Sainik School Entrance Exam Coaching</p>
      //         <div className="flex gap-4">
      //           <a  href="tel:+911234567890" className="text-green-500">
      //             <strong>Call Us</strong>
      //           </a>
      //           <a  href="https://wa.me/911234567890" className="text-green-500">
      //             <strong>WhatsApp Us</strong>
      //           </a>
      //         </div>
      //         <div className="mt-4 flex gap-4">
      //           <a
      //             href="https://www.facebook.com/sainikschoolcoaching"
      //             className="text-blue-600"
      //           >
      //             Facebook
      //           </a>
      //           <a
      //             href="https://www.instagram.com/sainikschoolcoaching"
      //             className="text-pink-500"
      //           >
      //             Instagram
      //           </a>
      //         </div>
      //       </div>
      //     </div>
      //   );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
