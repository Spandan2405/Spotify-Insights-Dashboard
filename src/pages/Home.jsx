"use client";

import { useState } from "react";
import { IoAnalyticsSharp, IoVideocamOutline } from "react-icons/io5";
import { MdAudiotrack, MdOutlineEmail } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { BsPeopleFill } from "react-icons/bs";
import { RiPlayListFill } from "react-icons/ri";
import Spotify from "../assets/logo/Spotify_logo";
import video from "../assets/Spotify Insight Dashboard.mp4";
import emailjs from "@emailjs/browser";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDemoLoading, setIsDemoLoading] = useState(false);
  const [isRequestSubmitted, setIsRequestSubmitted] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reason: "",
  });

  const handleDemoMode = () => {
    setIsDemoLoading(true);
    localStorage.setItem("spotify_demo_mode", "true");
    window.location.href = "/profile";
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const templateParams = {
        name: formData.name,
        email: formData.email,
        message: formData.reason || "",
        to_email: "spandan2405@gmail.com",
      };

      const response = await emailjs.send(
        "service_2sc247l",
        "template_k5jf49f",
        templateParams,
        "XY6OaUesBZ411G1I5"
      );

      if (response.status === 200) {
        setIsRequestSubmitted(true);
        setFormData({ name: "", email: "", reason: "" });
      } else {
        throw new Error("Email sending failed");
      }
    } catch (error) {
      console.error("EmailJS error:", error);
      alert("Failed to send email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-8">
            <h1 className="flex items-center text-4xl sm:text-5xl font-bold text-[#1DB954] gap-4">
              <Spotify className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />{" "}
              Spotify Dashboard
            </h1>
          </div>
          <p className="text-lg sm:text-xl text-[#B3B3B3] max-w-3xl mx-auto">
            Discover your music taste, top artists, favorite tracks, and
            listening habits with detailed analytics from your Spotify account
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 my-16">
          <div className="bg-[#181818] border border-[#282828] rounded-xl p-6 text-center hover:bg-[#282828] transition-all duration-300 shadow-md">
            <BsPeopleFill
              size={30}
              className="h-10 w-10 text-[#1DB954] mx-auto mb-4"
            />
            <h3 className="text-white text-xl font-semibold mb-2">
              Top Artists
            </h3>
            <p className="text-[#B3B3B3] text-sm">
              See your most listened to artists across different time periods
            </p>
          </div>

          <div className="bg-[#181818] border border-[#282828] rounded-xl p-6 text-center hover:bg-[#282828] transition-all duration-300 shadow-md">
            <MdAudiotrack
              size={20}
              className="h-10 w-10 text-[#1DB954] mx-auto mb-4"
            />
            <h3 className="text-white text-xl font-semibold mb-2">
              Top Tracks
            </h3>
            <p className="text-[#B3B3B3] text-sm">
              Discover your favorite songs and hidden gems in your library
            </p>
          </div>

          <div className="bg-[#181818] border border-[#282828] rounded-xl p-6 text-center hover:bg-[#282828] transition-all duration-300 shadow-md">
            <IoAnalyticsSharp
              size={20}
              className="h-10 w-10 text-[#1DB954] mx-auto mb-4"
            />
            <h3 className="text-white text-xl font-semibold mb-2">Analytics</h3>
            <p className="text-[#B3B3B3] text-sm">
              Get insights into your listening patterns and music preferences
            </p>
          </div>

          <div className="bg-[#181818] border border-[#282828] rounded-xl p-6 text-center hover:bg-[#282828] transition-all duration-300 shadow-md">
            <RiPlayListFill
              size={20}
              className="h-10 w-10 text-[#1DB954] mx-auto mb-4"
            />
            <h3 className="text-white text-xl font-semibold mb-2">Playlists</h3>
            <p className="text-[#B3B3B3] text-sm">
              Browse through your created playlists and discover new music
            </p>
          </div>
        </div>

        {/* Main Action Cards */}
        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          {/* Demo Mode Card */}
          <div className="bg-[#181818] border border-[#1DB954]/30 hover:border-[#1DB954]/50 transition-all duration-300 rounded-xl shadow-lg">
            <div className="p-8 text-center">
              <div className="mx-auto w-20 h-20 bg-[#1DB954]/20 rounded-full flex items-center justify-center mb-4">
                <FaRegEye size={40} className="text-[#1DB954]" />
              </div>
              <h3 className="text-white text-2xl font-bold mb-4">
                Try the Demo
              </h3>
              <p className="text-[#B3B3B3] text-base mb-6">
                Experience the full application with sample data. Perfect for
                recruiters and quick exploration.
              </p>
              <button
                onClick={handleDemoMode}
                disabled={isDemoLoading}
                className="w-full bg-[#1DB954] hover:bg-[#1ED760] text-white font-bold py-3 px-6 rounded-full transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isDemoLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                    Loading Demo...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <FaRegEye size={20} color="white" />
                    Launch Demo
                  </div>
                )}
              </button>
              <p className="text-xs text-[#B3B3B3] mt-4">
                No authentication required • Instant access • Sample data
              </p>
            </div>
          </div>

          {/* Request Access Card */}
          <div className="bg-[#181818] border border-blue-500/30 hover:border-blue-500/50 transition-all duration-300 rounded-xl shadow-lg">
            <div className="p-8 text-center">
              <div className="mx-auto w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
                <MdOutlineEmail size={40} className="text-blue-500" />
              </div>
              <h3 className="text-white text-2xl font-bold mb-4">
                Request Access
              </h3>
              <p className="text-[#B3B3B3] text-base mb-6">
                Get access to use your own Spotify account with the application.
                Perfect for personal use.
              </p>
              <button
                onClick={() => setIsRequestModalOpen(true)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-200 transform hover:scale-105 cursor-pointer"
              >
                <div className="flex items-center justify-center gap-2">
                  <MdOutlineEmail size={20} color="white" />
                  Request Access
                </div>
              </button>
              <p className="text-xs text-[#B3B3B3] mt-4">
                Personal Spotify data • Full features • Requires approval
              </p>
            </div>
          </div>

          {/* Video Walkthrough Card */}
          <div className="bg-[#181818] border border-indigo-500/30 hover:border-indigo-500/50 transition-all duration-300 rounded-xl shadow-lg">
            <div className="p-8 text-center">
              <div className="mx-auto w-20 h-20 bg-indigo-500/20 rounded-full flex items-center justify-center mb-4">
                <IoVideocamOutline size={40} className="text-indigo-500" />
              </div>
              <h3 className="text-white text-2xl font-bold mb-4">
                Video Walkthrough
              </h3>
              <p className="text-[#B3B3B3] text-base mb-6">
                Watch a comprehensive walkthrough of all features and
                capabilities of the application.
              </p>
              <button
                onClick={() => setIsVideoOpen(true)}
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-200 transform hover:scale-105 cursor-pointer"
              >
                <div className="flex items-center justify-center gap-2">
                  <IoVideocamOutline size={20} color="white" />
                  Watch Video
                </div>
              </button>
              <p className="text-xs text-[#B3B3B3] mt-4">
                5 min overview • All features • No signup required
              </p>
            </div>
          </div>
        </div>

        {/* Spotify Login */}
        <div className="flex flex-col items-center justify-center rounded-xl p-8 max-w-2xl mx-auto mb-16">
          <h2 className="text-xl font-bold mb-6 text-center">
            After getting access, login with Spotify
          </h2>
          <button
            className="px-8 py-3 bg-green-500 hover:bg-green-600 text-black font-bold rounded-full transition-all duration-200 flex items-center gap-2 text-xl cursor-pointer"
            onClick={() => localStorage.setItem("spotify_demo_mode", "false")}
          >
            <Spotify className="w-5 h-5" />
            <a href="https://spotify-dashboard-backend-yn6x.onrender.com/auth/login">
              Log in with Spotify
            </a>
          </button>
        </div>

        {/* Footer */}
        <div className="text-center pt-2 text-[#B3B3B3] text-sm">
          <p>
            Built with React, Next.js, Tailwind CSS, and the Spotify Web API
          </p>
        </div>
      </div>

      {/* Request Access Modal */}
      {isRequestModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
          <div className="bg-[#181818] border border-[#282828] rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">
                  Request Access
                </h2>
                <button
                  onClick={() => {
                    setIsRequestModalOpen(false);
                    setIsRequestSubmitted(false);
                  }}
                  className="text-[#B3B3B3] hover:text-white"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-[#B3B3B3] mb-6">
                Fill out this form to request access to the full application
              </p>

              {isRequestSubmitted ? (
                <div className="text-center py-8">
                  <svg
                    className="h-16 w-16 text-blue-500 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="text-xl font-semibold text-blue-500 mb-2">
                    Request Submitted!
                  </h3>
                  <p className="text-[#B3B3B3] mb-4">
                    Thank you for your interest. I'll review your request and
                    get back to you soon.
                  </p>
                  <button
                    onClick={() => setIsRequestSubmitted(false)}
                    className="border border-[#282828] text-[#B3B3B3] hover:bg-[#282828] px-4 py-2 rounded-lg transition-all duration-200"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="flex flex-col gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-[#B3B3B3] text-sm font-medium mb-1"
                      >
                        Name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-[#282828] border border-[#383838] text-white rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none transition-all duration-200"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-[#B3B3B3] text-sm font-medium mb-1"
                      >
                        Email *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-[#282828] border border-[#383838] text-white rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none transition-all duration-200"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="reason"
                      className="block text-[#B3B3B3] text-sm font-medium mb-1"
                    >
                      Why do you want access? (Optional)
                    </label>
                    <textarea
                      id="reason"
                      name="reason"
                      value={formData.reason}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full bg-[#282828] border border-[#383838] text-white rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none transition-all duration-200 resize-none"
                      placeholder="Tell me about your interest in the application..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-full transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                        Submitting...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <svg
                          className="mr-2 h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          />
                        </svg>
                        Submit Request
                      </div>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
          <div className="bg-[#181818] border border-[#282828] rounded-xl max-w-4xl w-full shadow-xl">
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">
                  Application Walkthrough
                </h2>
                <button
                  onClick={() => setIsVideoOpen(false)}
                  className="text-[#B3B3B3] hover:text-white"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="aspect-video bg-[#282828] rounded-lg flex items-center justify-center">
                <iframe
                  src={video}
                  className="w-full h-full rounded-lg"
                  allowFullScreen
                  title="Spotify Profile Analytics Walkthrough"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
