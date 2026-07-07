import { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import { getReviews } from "../../services/reviewService";

export default function Testimonials() {

  const [reviews, setReviews] = useState([]);

  const loadReviews = async () => {
    try {
      const res = await getReviews();
      setReviews(res.reviews.slice(0, 6));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50">

      <div className="max-w-7xl mx-auto px-6">

        <p
          className="text-center uppercase tracking-[4px] text-blue-600 font-bold"
          data-aos="fade-up"
        >
          Testimonials
        </p>

        <h2
          className="text-5xl font-bold text-center mt-3"
          data-aos="fade-up"
        >
          What Our Customers Say
        </h2>

        <p
          className="text-center text-gray-500 text-xl mt-5 max-w-3xl mx-auto"
          data-aos="fade-up"
        >
          Real reviews from our happy customers.
        </p>

        <div className="grid lg:grid-cols-3 gap-8 mt-16">

          {reviews.length === 0 ? (

            <p className="col-span-3 text-center text-gray-500">
              No reviews yet.
            </p>

          ) : (

            reviews.map((review, index) => (

              <div
                key={review._id}
                data-aos="fade-up"
                data-aos-delay={index * 150}
                className="group bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:-translate-y-3 hover:shadow-2xl transition-all duration-500"
              >

                <Quote
                  className="text-blue-600 mb-6"
                  size={36}
                />

                <p className="text-gray-600 leading-8">
                  "{review.comment}"
                </p>

                <div className="flex mt-6">

                  {Array.from({
                    length: review.rating,
                  }).map((_, i) => (

                    <Star
                      key={i}
                      size={18}
                      className="fill-yellow-400 text-yellow-400"
                    />

                  ))}

                </div>

                <div className="flex items-center gap-4 mt-8">

                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      review.user?.name || "User"
                    )}`}
                    alt={review.user?.name}
                    className="w-16 h-16 rounded-full border-4 border-blue-100"
                  />

                  <div>

                    <h3 className="font-bold text-lg">
                      {review.user?.name}
                    </h3>

                    <p className="text-gray-500">
                      Customer
                    </p>

                  </div>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

    </section>
  );
}