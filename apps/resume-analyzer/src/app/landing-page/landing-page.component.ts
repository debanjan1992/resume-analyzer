import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-white flex flex-col">
      <!-- Landing Header -->
      <header
        class="w-full px-6 py-4 flex items-center justify-between border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-50"
      >
        <div class="flex items-center gap-2">
          <div class="bg-blue-600 p-1.5 rounded-lg">
            <span class="material-symbols-outlined text-white"
              >description</span
            >
          </div>
          <span class="font-bold text-xl text-gray-900"
            >Smart Resume Analyzer</span
          >
        </div>
      </header>

      <!-- Hero Section -->
      <main
        class="flex-1 flex flex-col md:flex-row items-center justify-center p-6 md:p-12 lg:p-24 overflow-hidden relative"
      >
        <!-- Left Content -->
        <div class="flex-1 z-10 max-w-2xl">
          <div
            class="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
          >
            <span>Now with AI-Powered Insights</span>
          </div>

          <h1
            class="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Is your resume <span class="text-blue-600">ATS ready?</span>
          </h1>

          <p class="text-xl text-gray-600 mb-10 leading-relaxed max-w-lg">
            Don't let a bot reject your dream job. Our intelligent resume
            analyzer compares your resume against job descriptions to give you a
            competitive edge.
          </p>

          <div class="flex flex-col sm:flex-row gap-4">
            <a
              routerLink="/editor"
              class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-transform hover:scale-105 shadow-xl shadow-blue-200 text-center"
            >
              Analyze My Resume
            </a>
          </div>
        </div>

        <!-- Right Image (Illustration Placeholder) -->
        <div class="flex-1 relative mt-12 md:mt-0 w-full max-w-xl">
          <div
            class="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500"
          >
            <img
              src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Resume Analysis Dashboard"
              class="w-full h-auto object-cover"
            />

            <!-- Floating Badge 1 -->
            <div
              class="absolute bottom-10 -left-6 bg-white p-3 rounded-lg shadow-lg flex items-center gap-3 animate-bounce"
              style="animation-duration: 3s;"
            >
              <div class="bg-green-100 p-2 rounded-full">
                <span class="material-symbols-outlined text-green-600"
                  >check_circle</span
                >
              </div>
              <div>
                <p class="text-xs text-gray-500 font-medium">ATS Score</p>
                <p class="text-lg font-bold text-gray-900">92/100</p>
              </div>
            </div>

            <!-- Floating Badge 2 -->
            <div
              class="absolute top-10 -right-6 bg-white p-3 rounded-lg shadow-lg flex items-center gap-3 animate-bounce"
              style="animation-duration: 4s;"
            >
              <div class="bg-blue-100 p-2 rounded-full">
                <span class="material-symbols-outlined text-blue-600"
                  >auto_awesome</span
                >
              </div>
              <div>
                <p class="text-xs text-gray-500 font-medium">AI Analysis</p>
                <p class="text-sm font-bold text-gray-900">Optimized</p>
              </div>
            </div>
          </div>

          <!-- decorative blob -->
          <div
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-blue-100 to-indigo-50 rounded-full blur-3xl -z-10 opacity-70"
          ></div>
        </div>
      </main>

      <!-- Features Section -->
      <section class="py-24 bg-white">
        <div class="max-w-7xl mx-auto px-6">
          <div class="text-center mb-16">
            <h3
              class="text-blue-600 font-bold tracking-widest uppercase text-sm mb-3"
            >
              Features
            </h3>
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900">
              Optimize every application
            </h2>
          </div>

          <div class="grid md:grid-cols-3 gap-8">
            <!-- Feature 1 -->
            <div
              class="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div
                class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6"
              >
                <span class="material-symbols-outlined text-white text-2xl"
                  >analytics</span
                >
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">
                Real-time Scoring
              </h3>
              <p class="text-gray-600 leading-relaxed">
                Get an instant score from 0-100 based on modern ATS algorithms.
              </p>
            </div>

            <!-- Feature 2 -->
            <div
              class="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div
                class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6"
              >
                <span class="material-symbols-outlined text-white text-2xl"
                  >search</span
                >
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">
                Keyword Gap Analysis
              </h3>
              <p class="text-gray-600 leading-relaxed">
                Identify exactly which hard skills and keywords are missing from
                your resume.
              </p>
            </div>

            <!-- Feature 3 -->
            <div
              class="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div
                class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6"
              >
                <span class="material-symbols-outlined text-white text-2xl"
                  >bolt</span
                >
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Power Verbs</h3>
              <p class="text-gray-600 leading-relaxed">
                Transform weak passive voice into strong, action-oriented impact
                language.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
})
export class LandingPageComponent {}
