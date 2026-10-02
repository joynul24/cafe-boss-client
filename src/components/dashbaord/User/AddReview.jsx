import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { FaPaperPlane, FaStar } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const AddReview = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [rating, setRating] = useState(5);
    const [hover, setHover] = useState(0);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm();

    const onSubmit = async (data) => {
        const reviewInfo = {
            name: user?.displayName || 'Anonymous',
            email: user?.email,
            rating: Number(rating),
            recipeName: data.recipeName,
            suggestion: data.suggestion,
            details: data.details,
            date: new Date().toISOString()
        };

        try {
            const res = await axiosSecure.post('/reviews', reviewInfo);
            if (res.data.insertedId) {
                reset();
                setRating(5);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Thank you for your review!',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to submit review. Please try again!'
            });
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-12">
            {/* Header Title */}
            <div className="text-center mb-8">
                <h3 className="text-xl sm:text-2xl font-serif tracking-widest text-gray-400 uppercase">
                    --- Sharing is Caring! ---
                </h3>
                <h1 className="text-2xl sm:text-4xl font-serif font-bold uppercase tracking-wider text-gray-800 mt-2 border-y-2 border-gray-200 py-3 inline-block px-8">
                    GIVE A REVIEW...
                </h1>
            </div>

            {/* Form Container */}
            <div className="bg-[#F3F3F3] p-6 sm:p-12 rounded-lg shadow-sm">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Interactive Star Rating */}
                    <div className="text-center">
                        <h2 className="text-xl sm:text-2xl font-serif text-gray-700 mb-3 tracking-wide">
                            RATE US!
                        </h2>
                        <div className="flex justify-center items-center gap-2">
                            {[...Array(5)].map((_, index) => {
                                const ratingValue = index + 1;
                                return (
                                    <button
                                        type="button"
                                        key={index}
                                        className="focus:outline-none transition-transform hover:scale-110"
                                        onClick={() => setRating(ratingValue)}
                                        onMouseEnter={() => setHover(ratingValue)}
                                        onMouseLeave={() => setHover(0)}
                                    >
                                        <FaStar
                                            className="text-2xl sm:text-4xl cursor-pointer transition-colors duration-200"
                                            color={
                                                ratingValue <= (hover || rating)
                                                    ? '#D1A054'
                                                    : '#E5E7EB'
                                            }
                                        />
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Input 1: Recipe Name */}
                    <div>
                        <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                            Which recipe you liked most?
                        </label>
                        <input
                            type="text"
                            placeholder="Recipe you liked most"
                            {...register('recipeName', { required: 'Recipe name is required' })}
                            className="w-full px-4 py-3 bg-white rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D1A054] text-sm sm:text-base"
                        />
                        {errors.recipeName && (
                            <span className="text-red-500 text-xs mt-1 block">
                                {errors.recipeName.message}
                            </span>
                        )}
                    </div>

                    {/* Input 2: Suggestion */}
                    <div>
                        <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                            Do you have any suggestion for us?
                        </label>
                        <input
                            type="text"
                            placeholder="Suggestion"
                            {...register('suggestion')}
                            className="w-full px-4 py-3 bg-white rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D1A054] text-sm sm:text-base"
                        />
                    </div>

                    {/* Input 3: Review Details */}
                    <div>
                        <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                            Kindly express your care in a short way.
                        </label>
                        <textarea
                            rows="5"
                            placeholder="Review in detail"
                            {...register('details', { required: 'Review details are required' })}
                            className="w-full px-4 py-3 bg-white rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D1A054] text-sm sm:text-base resize-none"
                        ></textarea>
                        {errors.details && (
                            <span className="text-red-500 text-xs mt-1 block">
                                {errors.details.message}
                            </span>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#835D23] to-[#B58130] hover:from-[#B58130] hover:to-[#835D23] text-white font-semibold rounded-none shadow-md transition-all duration-300 disabled:opacity-50"
                        >
                            <span>{isSubmitting ? 'Sending...' : 'Send Review'}</span>
                            <FaPaperPlane className="text-sm" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddReview;