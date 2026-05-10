import { useBranding } from "../../shared/hooks/useBranding";
import VideoPlayer from "../../shared/video/VideoPlayer";

export default function PreviewVideo() {
  const brand = useBranding();
  const theme = brand.theme || {};
  const preview = brand.preview || {};

  const videoId =
    preview.bunnyVideoId ||
    brand.hero?.bunnyVideoId;

  const poster =
    brand.hero?.image;

  return (
    <section className="relative overflow-hidden bg-white text-black md:px-16">
      <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">

        {/* 🎥 VIDEO — CLEAN */}
        <div className="w-full">
           {/* <VideoPlayer
            videoId={videoId}
            poster={poster}
          />  */}
          <img src={preview.poster} className="w-[100vw] md:w-[50vw]" alt="" />
        </div>

        {/* 📝 TEXT — KEPT */}
        <div className="p-6 md:p-10 lg:p-14 space-y-6 md:space-y-8">
          <h2 className={`text-2xl md:text-3xl font-bold `}>
            {preview.title}{" "}
            <span style={{ color: brand.colors.primary }}>
              {preview.highlight}
            </span>
          </h2>

          <p className={`text-sm md:text-base `}>
            {preview.description}
          </p>
        </div>

      </div>
    </section>
  );
}