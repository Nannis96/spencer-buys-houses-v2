"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Phone, Mail, User, ArrowRight, Loader2, CheckCircle2, ShieldCheck } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const leadSchema = z.object({
    name: z.string().min(2, "Please enter your name"),
    address: z.string().min(5, "Please enter a valid property address"),
    phone: z
        .string()
        .min(10, "Please enter a valid phone number")
        .regex(/^[\d\s\-().+]+$/, "Please enter a valid phone number"),
    email: z.string().email("Please enter a valid email address"),
})

type LeadFormData = z.infer<typeof leadSchema>

export function LeadForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LeadFormData>({
        resolver: zodResolver(leadSchema),
    })

    const onSubmit = (data: LeadFormData) => {
        setIsSubmitting(true)
        // Simulate API call
        console.log("Lead form submitted:", data)
        setTimeout(() => {
            setIsSubmitting(false)
            setSubmitted(true)
        }, 1500)
    }

    return (
        <AnimatePresence mode="wait">
            {submitted ? (
                <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="rounded-2xl bg-[#1a1a2e] p-8 md:p-10 text-center border border-white/10"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#22c55e]/10"
                    >
                        <CheckCircle2 className="h-10 w-10 text-[#22c55e]" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                        {"You're All Set!"}
                    </h3>
                    <p className="text-gray-300 mb-4 leading-relaxed">
                        {"One of our home buying specialists will reach out within the next 24 hours with your personalized cash offer."}
                    </p>
                    <div className="inline-flex items-center gap-2 rounded-full bg-[#f59e0b]/10 px-4 py-2 text-sm font-medium text-[#f59e0b]">
                        <ShieldCheck className="h-4 w-4" />
                        Your information is 100% secure
                    </div>
                </motion.div>
            ) : (
                <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="rounded-2xl bg-[#1a1a2e] p-6 md:p-8 border border-white/10"
                >
                    <h3 className="text-xl font-bold text-white mb-1">
                        Get An Offer Today, Sell In A Matter Of Days
                    </h3>
                    {/* <p className="text-gray-400 text-sm mb-6">
                        100% free. Zero obligation. Results in 24 hours.
                    </p> */}

                    <div className="flex flex-col gap-4">
                        <div>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#f59e0b]" />
                                <Input
                                    placeholder="Your Name"
                                    {...register("name")}
                                    className="pl-11 h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-[#f59e0b] focus-visible:border-[#f59e0b]"
                                    aria-invalid={!!errors.name}
                                />
                            </div>
                            {errors.name && (
                                <p className="mt-1.5 text-xs text-red-400">{errors.name.message}</p>
                            )}
                        </div>
                        <div>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#f59e0b]" />
                                <Input
                                    placeholder="Property Address"
                                    {...register("address")}
                                    className="pl-11 h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-[#f59e0b] focus-visible:border-[#f59e0b]"
                                    aria-invalid={!!errors.address}
                                />
                            </div>
                            {errors.address && (
                                <p className="mt-1.5 text-xs text-red-400">{errors.address.message}</p>
                            )}
                        </div>

                        <div>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#f59e0b]" />
                                <Input
                                    type="tel"
                                    placeholder="Phone Number"
                                    {...register("phone")}
                                    className="pl-11 h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-[#f59e0b] focus-visible:border-[#f59e0b]"
                                    aria-invalid={!!errors.phone}
                                />
                            </div>
                            {errors.phone && (
                                <p className="mt-1.5 text-xs text-red-400">{errors.phone.message}</p>
                            )}
                        </div>

                        <div>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#f59e0b]" />
                                <Input
                                    type="email"
                                    placeholder="Email Address"
                                    {...register("email")}
                                    className="pl-11 h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-[#f59e0b] focus-visible:border-[#f59e0b]"
                                    aria-invalid={!!errors.email}
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="h-14 text-lg font-bold bg-[#f59e0b] hover:bg-[#d97706] text-[#0f0f23] rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                        >
                            {isSubmitting ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <>
                                    GET MY FREE CASH OFFER
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </>
                            )}
                        </Button>
                    </div>

                    {/* <p className="text-xs text-gray-500 mt-4 text-center">
                        {"Your information is secure and never shared with third parties."}
                    </p> */}
                </motion.form>
            )}
        </AnimatePresence>
    )
}
