import React from "react";
import { useBranding } from "../../shared/hooks/useBranding";

export default function About() {
  const brand = useBranding();

  return (
    <div className="bg-[#f8fafc] text-[#0f172a]">

      {/* HERO */}
      <div className="relative h-[55vh] flex items-center justify-center text-center">
        <img
          src="/pcm-hero.jpg"
          className="absolute w-full h-full object-cover"
          alt="PCM Tuition"
        />
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 text-white px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About {brand.siteName}
          </h1>
          <p className="max-w-2xl mx-auto text-lg opacity-90">
            Focused coaching for +1 & +2 students in Physics, Chemistry & Mathematics.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* INTRO */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <img
            src="/classroom.jpg"
            alt="classroom"
            className="rounded-xl shadow-md"
          />

          <div>
            <h2 className="text-3xl font-semibold mb-4">
              Build Strong PCM Foundations
            </h2>
            <p className="mb-4 text-gray-600">
              {brand.siteName} is dedicated to helping +1 and +2 students master
              Physics, Chemistry, and Mathematics with clarity and confidence.
            </p>
            <p className="text-gray-500">
              Our teaching focuses on concept clarity, regular practice, and
              exam-oriented preparation to ensure students perform their best
              in board exams and competitive tests.
            </p>
          </div>
        </div>

        {/* WHY US */}
        <div className="mt-20">
          <h2 className="text-3xl font-semibold text-center mb-10">
            Why Choose Us
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              "Concept-based teaching (not mugging)",
              "Weekly & monthly test series",
              "Personal attention for every student",
              "Previous year question focus",
              "Exam strategy & time management",
              "Doubt-clearing sessions"
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 bg-white border border-[#e2e8f0] rounded-xl hover:shadow-md transition"
              >
                <p className="font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SUBJECTS */}
        <div className="mt-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-4">Subjects Covered</h2>
            <ul className="space-y-3 text-gray-600">
              <li>• Physics (Concept + Numericals)</li>
              <li>• Chemistry (Theory + Problem Solving)</li>
              <li>• Mathematics (Step-by-step mastery)</li>
              <li>• Board Exam Preparation</li>
              <li>• Entrance-Oriented Practice</li>
            </ul>
          </div>

          <img
            src="/study.jpg"
            alt="study"
            className="rounded-xl shadow-md"
          />
        </div>

        {/* VALUES */}
        <div className="mt-20">
          <h2 className="text-3xl font-semibold text-center mb-10">
            Our Approach
          </h2>

          <div className="grid md:grid-cols-4 gap-6 text-center">
            {[
              "Clarity",
              "Consistency",
              "Practice",
              "Results"
            ].map((val, i) => (
              <div
                key={i}
                className="p-6 bg-white border border-[#e2e8f0] rounded-xl"
              >
                <h3 className="font-semibold">{val}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* RESULT / TRUST */}
        <div className="mt-20 grid md:grid-cols-2 gap-10 items-center">
          <img
            src="/results.jpg"
            alt="results"
            className="rounded-xl shadow-md"
          />

          <div>
            <h2 className="text-3xl font-semibold mb-4">
              Proven Results
            </h2>
            <p className="mb-3 text-gray-600">
              Our students consistently improve their scores through structured
              learning and regular evaluation.
            </p>
            <p className="text-gray-500">
              We focus not just on marks, but on building a strong academic
              foundation that helps students succeed in higher studies.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold mb-4">
            Start Your PCM Journey Today
          </h2>
          <p className="text-gray-600 mb-6">
            Join {brand.siteName} and experience focused, result-oriented coaching.
          </p>

          <a
            href="/contact"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Enroll Now
          </a>
        </div>

      </div>
    </div>
  );
}