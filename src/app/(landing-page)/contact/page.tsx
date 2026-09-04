"use client";

import React_2 from "react";
import { Send, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { LucideIcon, Loader2Icon } from "lucide-react";
import * as React from "react";
import { useContext } from "react";
import * as z_2 from "zod";
import { Slot as Slot_2 } from "@radix-ui/react-slot";
import { ClassValue, clsx as clsx_2 } from "clsx";
import { twMerge } from "tailwind-merge";
import * as LabelPrimitive_2 from "@radix-ui/react-label";
import { Controller, ControllerProps, FieldPath, FieldValues, FormProvider, useFormContext } from "react-hook-form";
import { FormFieldContext, FormItemContext } from "@/x/cd5a8b8f";

const Form = FormProvider;

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot_2>,
  React.ComponentPropsWithoutRef<typeof Slot_2>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot_2
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx_2(inputs));
}

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-1", className)} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = "FormItem";

interface FormLabelProps extends React.ComponentPropsWithoutRef<
  typeof LabelPrimitive_2.Root
> {
  required?: boolean;
  loading?: boolean;
}

const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, required, loading, ...props }, ref) => {
    const { formItemId } = useFormField();

    return (
      <LabelPrimitive_2.Root
        ref={ref}
        className={cn(
          className,
          "text-foreground ml-1 flex items-center text-[0.75rem] font-semibold uppercase",
        )}
        htmlFor={formItemId}
        {...props}
      >
        {props.children}
        {required && (
          <span className="text-destructive ml-0.5 text-sm font-semibold">
            *
          </span>
        )}
        {loading && (
          <div className="animate-pulse">
            <Loader2Icon className="text-muted-foreground ml-1 size-3.5 animate-spin" />
          </div>
        )}
      </LabelPrimitive_2.Root>
    );
  },
);
FormLabel.displayName = "FormLabel";

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-destructive text-sm font-medium", className)}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

interface InputProps extends React.ComponentProps<"input"> {
  icon?: LucideIcon;
}

function Input({ className, type, icon: Icon, ...props }: InputProps) {
  const input = (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "border-input bg-input/20 file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/30 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 h-9 w-full min-w-0 rounded-md border px-3 py-1.5 text-sm outline-none transition-colors file:inline-flex file:h-8 file:border-0 file:bg-transparent file:text-xs/relaxed file:font-medium focus-visible:ring-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-xs/relaxed",
        Icon && "pl-8",
        className,
      )}
      {...props}
    />
  );

  if (!Icon) return input;

  return (
    <div className="relative flex w-full items-center">
      <Icon className="text-muted-foreground pointer-events-none absolute left-2.5 size-4" />
      {input}
    </div>
  );
}

const ZContactForm = z_2.object({
  name: z_2.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z_2.string().email({ message: "Please enter a valid email address." }),
  subject: z_2
    .string()
    .min(5, { message: "Subject must be at least 5 characters." }),
  message: z_2
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});
const contactDetails = [
            {
              id: "address",
              title: "Our Location",
              content: "II Internship Tech Park, Sector 62, Noida, India - 201309",
              icon: MapPin,
              bgClass: "bg-blue-500/10",
              iconClass: "text-blue-600 dark:text-blue-500",
            },
            {
              id: "email",
              title: "Email Us",
              content: "i3.office2025@gmail.com",
              icon: Mail,
              bgClass: "bg-emerald-500/10",
              iconClass: "text-emerald-600 dark:text-emerald-500",
            },
            {
              id: "phone",
              title: "Call Us",
              content: "+91 98765 43210",
              icon: Phone,
              bgClass: "bg-amber-500/10",
              iconClass: "text-amber-600 dark:text-amber-500",
            },
            {
              id: "hours",
              title: "Working Hours",
              content: "Mon - Sat: 9:00 AM to 6:00 PM",
              icon: Clock,
              bgClass: "bg-purple-500/10",
              iconClass: "text-purple-600 dark:text-purple-500",
            },
          ];


export default function ContactPage() {
    type TContactForm = z_2.infer<typeof ZContactForm>;

    const ZContactForm = z.object({
      name: z.string().min(2, { message: "Name must be at least 2 characters." }),
      email: z.string().email({ message: "Please enter a valid email address." }),
      subject: z
        .string()
        .min(5, { message: "Subject must be at least 5 characters." }),
      message: z
        .string()
        .min(10, { message: "Message must be at least 10 characters." }),
    });
    const form = useForm<TContactForm>({
            resolver: zodResolver(ZContactForm),
            defaultValues: {
              name: "",
              email: "",
              subject: "",
              message: "",
            },
          });
    function onSubmit(values: TContactForm) {
                console.log("Form Data Submitted:", values);
            alert("Message sent successfully!");
            form.reset();
          }

  return (
    <main className="bg-background relative flex min-h-screen flex-col overflow-hidden">
      <section className="to-primary relative isolate min-h-[520px] overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-800 pb-[130px] pt-[20px] md:pt-[2px]">
                    {}
                    <div className="pointer-events-none absolute inset-0 -z-[4] bg-[radial-gradient(theme(colors.white/0.05)_1px,transparent_1px)] [background-size:24px_24px]"></div>

                    <div
                      className="absolute inset-0 -z-[3]"
                      style={{
                        background: `radial-gradient(circle at 18% 24%, rgba(255, 255, 255, 0.04), transparent 34%), radial-gradient(circle at 81% 12%, rgba(255, 255, 255, 0.04), transparent 30%)`,
                      }}
                    />

                    {}
                    <img
                      src="/images/bg-lines.png"
                      alt=""
                      className="absolute inset-0 -z-[2] h-full w-full object-cover opacity-[0.14]"
                    />

                    <div className="relative mx-auto mt-12 grid w-[min(1300px,calc(100%-56px))] grid-cols-1 items-center gap-8 text-center md:mt-20 lg:grid-cols-2 lg:gap-0 lg:text-left">
                      {}
                      <div className="relative z-30 mx-auto w-full max-w-[560px] lg:mx-0">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/90 backdrop-blur-md">
                          <MessageCircle className="h-4 w-4 text-emerald-300" />
                          We&apos;re here to help
                        </div>

                        {}
                        <h1 className="text-primary-foreground font-[family-name:var(--font-playfair-display,'Playfair_Display',serif)] text-[clamp(2.3rem,6vw,5rem)] leading-[1.1]">
                          Get In Touch
                        </h1>

                        {}
                        <p className="text-primary-foreground/85 mx-auto mt-[12px] max-w-[500px] text-left text-[0.9rem] leading-[1.6] sm:text-[1.1rem] lg:mx-0">
                          We&apos;d love to hear from you! Whether you have a question about
                          our internship programs, pricing, partnerships, or anything else,
                          our team is ready to answer all your questions.
                        </p>
                      </div>

                      {}
                      <div className="relative mt-[20px] flex justify-center lg:mt-0 lg:translate-y-[20px] lg:justify-end">
                        <div className="absolute left-1/2 top-[20px] h-[260px] w-[300px] -translate-x-1/2 rotate-[10deg] rounded-[20px] bg-yellow-400 lg:left-auto lg:right-[60px] lg:translate-x-0"></div>
                        <img
                          src="/images/F-img.webp"
                          alt="Contact Us"
                          className="relative z-10 aspect-[4/3] w-full max-w-[450px] rounded-[20px] border-[6px] border-white/10 object-cover shadow-2xl lg:max-w-[500px]"
                        />
                      </div>
                    </div>

                    {}
                    <div
                      className="pointer-events-none absolute bottom-[-6px] left-0 z-20 w-full overflow-hidden"
                      aria-hidden="true"
                    >
                      <svg
                        viewBox="0 0 1440 180"
                        preserveAspectRatio="none"
                        className="h-[280px] w-full"
                      >
                        <path
                          d="M0,125 C260,145 520,78 790,92 C1020,104 1225,70 1440,62 L1440,180 L0,180 Z"
                          className="fill-background"
                        />
                      </svg>
                    </div>
                  </section>

      {}
      <div className="bg-primary pointer-events-none absolute left-[-5%] top-[300px] z-0 h-[300px] w-[300px] rounded-full opacity-30 mix-blend-multiply blur-[100px] filter md:h-[400px] md:w-[400px] md:blur-[120px]"></div>
      <div className="bg-primary pointer-events-none absolute bottom-[10%] right-[-5%] z-0 h-[400px] w-[400px] rounded-full opacity-20 mix-blend-multiply blur-[120px] filter md:h-[500px] md:w-[500px] md:blur-[150px]"></div>

      <section className="relative z-10 mx-auto -mt-16 mb-16 w-full max-w-[1300px] px-4 sm:px-6 md:-mt-32 md:mb-24 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-6 md:mt-14 lg:gap-8">
                            <div>
                              <h2 className="text-foreground mb-4 text-3xl font-extrabold">
                                Contact Information
                              </h2>
                              <p className="text-muted-foreground">
                                Reach out to us through any of the channels below. We strive to
                                respond to all inquiries within 24 hours.
                              </p>
                            </div>

                            <div className="grid grid-cols-2 gap-3 md:gap-4 lg:gap-6">
                              {contactDetails.map((detail) => {
                                const Icon = detail.icon;
                                return (
                                  <div
                                    key={detail.id}
                                    className="group flex flex-col items-center justify-center rounded-[1.25rem] border border-white/60 bg-white/80 p-4 text-center shadow-[0_8px_30px_rgb(0,0,0,0.08)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgb(0,0,0,0.12)] md:rounded-3xl md:p-6 md:hover:-translate-y-2 dark:border-white/10 dark:bg-black/60"
                                  >
                                    <div className="group-hover:bg-primary mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 transition-all duration-300 group-hover:scale-110 md:mb-4 md:h-12 md:w-12 dark:bg-emerald-900/40">
                                      <Icon className="text-primary h-5 w-5 transition-colors duration-300 group-hover:text-white md:h-6 md:w-6" />
                                    </div>
                                    <h3 className="text-foreground mb-1 text-base font-bold md:mb-2 md:text-lg">
                                      {detail.title}
                                    </h3>
                                    <p className="text-muted-foreground w-full break-words text-xs font-medium leading-snug sm:text-sm md:leading-relaxed">
                                      {detail.content}
                                    </p>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
          <div className="relative w-full overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-2xl sm:p-8 md:mt-4 lg:p-10 dark:border-white/10 dark:bg-black/60">
                            {}
                            <div className="bg-primary/20 pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full blur-3xl"></div>
                            <div className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-yellow-400/20 blur-3xl"></div>

                            <div className="relative z-10">
                              <h2 className="text-foreground mb-2 text-2xl font-extrabold">
                                Send us a Message
                              </h2>
                              <p className="text-muted-foreground mb-8 text-sm">
                                Fill out the form below and we&apos;ll get back to you shortly.
                              </p>

                              <Form {...form}>
                                <form
                                  onSubmit={form.handleSubmit(onSubmit)}
                                  className="flex flex-col gap-5"
                                >
                                  {}
                                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                    <FormField
                                      control={form.control}
                                      name="name"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Full Name</FormLabel>
                                          <FormControl>
                                            <Input
                                              placeholder="John Doe"
                                              className="rounded-xl border border-black/10 bg-white/50 px-4 py-3 dark:border-white/10 dark:bg-black/50"
                                              {...field}
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                    <FormField
                                      control={form.control}
                                      name="email"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Email Address</FormLabel>
                                          <FormControl>
                                            <Input
                                              type="email"
                                              placeholder="john@example.com"
                                              className="rounded-xl border border-black/10 bg-white/50 px-4 py-3 dark:border-white/10 dark:bg-black/50"
                                              {...field}
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                  </div>

                                  {}
                                  <FormField
                                    control={form.control}
                                    name="subject"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Subject</FormLabel>
                                        <FormControl>
                                          <Input
                                            placeholder="How can we help you?"
                                            className="rounded-xl border border-black/10 bg-white/50 px-4 py-3 dark:border-white/10 dark:bg-black/50"
                                            {...field}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />

                                  {}
                                  <FormField
                                    control={form.control}
                                    name="message"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Message</FormLabel>
                                        <FormControl>
                                          <textarea
                                            placeholder="Write your message here..."
                                            className="focus:ring-primary placeholder:text-muted-foreground/50 text-foreground flex min-h-[120px] w-full resize-none rounded-xl border border-black/10 bg-white/50 px-4 py-3 text-sm outline-none transition-all focus:border-transparent focus:ring-2 dark:border-white/10 dark:bg-black/50"
                                            {...field}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />

                                  {}
                                  <button
                                    type="submit"
                                    className="from-primary hover:from-primary/90 text-primary-foreground group relative mt-2 flex h-11 w-full items-center justify-center rounded-md border-0 bg-gradient-to-r to-emerald-500 text-[15px] font-medium shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:to-emerald-500/90 hover:shadow-[0_8px_20px_rgba(16,185,129,0.3)] sm:h-12 lg:h-[50px] lg:text-[17px]"
                                  >
                                    <span>Send Message</span>
                                    <span className="bg-background text-primary group-hover:bg-foreground group-hover:text-background absolute right-1.5 flex h-8 w-8 shrink-0 items-center justify-center rounded shadow-sm transition-colors duration-300 sm:right-2 lg:right-2 lg:h-9 lg:w-9">
                                      <Send className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 lg:h-[18px] lg:w-[18px]" />
                                    </span>
                                  </button>
                                </form>
                              </Form>
                            </div>
                          </div>
        </div>
      </section>

      {}
      <section className="relative z-10 mx-auto mb-16 w-full max-w-[1300px] px-4 sm:px-6 md:mb-24 lg:px-8">
        <div className="relative h-[350px] w-full overflow-hidden border border-white/20 bg-white/5 md:h-[500px] dark:border-white/10">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112151.72899450849!2d77.30164283842603!3d28.545803277717436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a43173357b%3A0x37ffce30c87cc03f!2sNoida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "grayscale(20%) contrast(1.1)" }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 object-cover"
          ></iframe>
        </div>
      </section>
    </main>
  );
}
