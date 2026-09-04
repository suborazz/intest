"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, MessageSquare, Star } from "lucide-react";
import React_2, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z_2 from "zod";
import { LucideIcon, Loader2Icon } from "lucide-react";
import * as React from "react";
import { useContext } from "react";
import { useMutation, useQueryClient, UseMutationOptions, UseMutationResult } from "@tanstack/react-query";
import { cva, VariantProps } from "class-variance-authority";
import { z } from "zod";
import { Slot } from "radix-ui";
import { Slot as Slot_2 } from "@radix-ui/react-slot";
import { ClassValue, clsx as clsx_2 } from "clsx";
import { twMerge } from "tailwind-merge";
import * as LabelPrimitive_2 from "@radix-ui/react-label";
import { Controller, ControllerProps, FieldPath, FieldValues, FormProvider, useFormContext } from "react-hook-form";
import { AuthContext } from "@/x/8789d6dc";
import { FormFieldContext, FormItemContext } from "@/x/cd5a8b8f";
import { axiosInstance } from "@/x/acfb3dca";
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-md border border-transparent bg-clip-padding text-xs/relaxed font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        outline:
          "border-border hover:bg-input/50 hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:bg-input/30",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-9 gap-1.5 px-4 text-xs/relaxed has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3 [&_svg:not([class*='size-'])]:size-4",
        xs: "h-6 gap-1 rounded-sm px-2 text-[0.625rem] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1 px-3 text-xs/relaxed has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-10 gap-1.5 px-5 text-sm/relaxed has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4 [&_svg:not([class*='size-'])]:size-4.5",
        icon: "size-9 [&_svg:not([class*='size-'])]:size-4",
        "icon-xs": "size-6 rounded-sm [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8 [&_svg:not([class*='size-'])]:size-3.5",
        "icon-lg": "size-10 [&_svg:not([class*='size-'])]:size-4.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx_2(inputs));
}

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

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

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "field-sizing-content border-input bg-input/20 placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/30 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 flex min-h-16 w-full resize-none rounded-md border px-2 py-2 text-sm outline-none transition-colors focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-xs/relaxed",
        className,
      )}
      {...props}
    />
  );
}
type TMutationOptions<
      TData,
      TError = Error,
      TVariables = void,
      TContext = unknown,
    > = Omit<UseMutationOptions<TData, TError, TVariables, TContext>, "mutationFn">;

interface ApiSuccess<T> {
      success: boolean;
      data: T;
      message?: string;
    }

interface ReviewResponseData {
      id: string;
      name: string;
      email: string;
      role: string | null;
      rating: number;
      comment: string;
      avatarUrl: string | null;
      isApproved: boolean;
      approvedAt: string | null;
      createdAt: string;
      updatedAt: string;
    }

type CreateReviewResponse = ApiSuccess<ReviewResponseData>;

interface CreateReviewPayload {
      name: string;
      email: string;
      role?: string;
      rating: number;
      comment: string;
    }

type TMutationReturnType<
      TData,
      TVariables,
      TError = Error,
      TContext = unknown,
    > = UseMutationResult<TData, TError, TVariables, TContext>;

interface IReviewDataHooks {
      useSubmitReview: (
        options?: TMutationOptions<
          CreateReviewResponse,
          Error,
          CreateReviewPayload
        >,
      ) => TMutationReturnType<CreateReviewResponse, CreateReviewPayload>;
    }

interface IReviewService {
      submitReview: (payload: CreateReviewPayload) => Promise<CreateReviewResponse>;
    }

const ZCreateReview = z.object({
      name: z.string().min(2, "Name must be at least 2 characters").max(100),
      email: z.string().email("Invalid email address"),
      role: z.string().max(100).optional(),
      rating: z
        .number()
        .int()
        .min(1, "Rating must be at least 1")
        .max(5, "Rating cannot exceed 5"),
      comment: z
        .string()
        .min(10, "Comment must be at least 10 characters")
        .max(1000),
    });

type TCreateReview = z.infer<typeof ZCreateReview>;

const ZCreateReview_2 = z_2.object({
      name: z_2.string().min(2, "Name must be at least 2 characters").max(100),
      email: z_2.string().email("Invalid email address"),
      role: z_2.string().max(100).optional(),
      rating: z_2
        .number()
        .int()
        .min(1, "Rating must be at least 1")
        .max(5, "Rating cannot exceed 5"),
      comment: z_2
        .string()
        .min(10, "Comment must be at least 10 characters")
        .max(1000),
    });


export default function StudentReviewsPage() {
    const ReviewService: IReviewService = {
      async submitReview(payload) {
        const response = await axiosInstance.post<CreateReviewResponse>(
          "/reviews",
          payload,
        );
        return response.data;
      },
    };

    const ReviewDataHooks: IReviewDataHooks = {
      useSubmitReview(options) {
        const queryClient = useQueryClient();
        return useMutation({
          mutationFn: async (payload) => await ReviewService.submitReview(payload),
          ...options,
          onSuccess: (data, variables, context, mutation) => {
            toast.success(data.message || "Review submitted successfully!");
            queryClient.invalidateQueries({ queryKey: ["reviews"] });
            options?.onSuccess?.(data, variables, context, mutation);
          },
          onError: (error, variables, context, mutation) => {
            toast.error(error.message || "Failed to submit review.");
            options?.onError?.(error, variables, context, mutation);
          },
        });
      },
    };

    function useAuth() {
      return useContext(AuthContext);
    }

  const { user } = useAuth();
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<TCreateReview>({
    resolver: zodResolver(ZCreateReview_2),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      role: "Student",
      rating: 5,
      comment: "",
    },
  });

  React_2.useEffect(() => {
    if (user) {
      form.setValue("name", user.name || "");
      form.setValue("email", user.email || "");
    }
  }, [user, form]);

  const { mutate: submitReview, isPending: isSubmitting } =
    ReviewDataHooks.useSubmitReview({
      onSuccess: () => {
        setIsSubmitted(true);
      },
    });

  const onSubmit = (values: TCreateReview) => {
    if (!user) {
      toast.error("Please login to submit a review.");
      return;
    }
    submitReview(values);
  };

  if (isSubmitted) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center space-y-4 p-6 text-center">
        <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-500">
          <CheckCircle2 className="size-12" />
        </div>
        <h2 className="text-foreground text-2xl font-extrabold tracking-tight">
          Review Submitted!
        </h2>
        <p className="text-muted-foreground max-w-sm text-sm">
          Thank you for sharing your feedback. Your review will be displayed
          publicly once approved by our administrator.
        </p>
        <Button
          onClick={() => {
            setIsSubmitted(false);
            form.reset({
              name: user?.name || "",
              email: user?.email || "",
              role: "Student",
              rating: 5,
              comment: "",
            });
          }}
          variant="outline"
        >
          Submit Another Review
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl space-y-6 p-4">
      <div className="space-y-1">
        <h1 className="text-foreground flex items-center gap-2 text-2xl font-extrabold tracking-tight">
          <MessageSquare className="text-primary size-6" /> Write a Testimonial
        </h1>
        <p className="text-muted-foreground text-sm">
          Share your learning experience and feedback with the community.
        </p>
      </div>

      <div className="bg-card/85 border-border/50 rounded-2xl border p-6 shadow-md backdrop-blur-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {}
            <div className="bg-muted/40 border-border/30 space-y-3 rounded-xl border p-4">
              <h3 className="text-foreground text-xs font-bold uppercase tracking-wider">
                Your Details
              </h3>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="text-muted-foreground font-medium">Name</p>
                  <p className="text-foreground mt-0.5 font-semibold">
                    {user?.name || "Student"}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground font-medium">Email</p>
                  <p className="text-foreground mt-0.5 font-semibold">
                    {user?.email || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-foreground block text-sm font-semibold">
                    Designation / Role
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Intern, Web Developer Student"
                      className="bg-background/80 border-border/50 text-foreground focus:ring-primary/40 h-auto w-full rounded-xl border p-3 text-sm focus:outline-none focus:ring-2"
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
              name="rating"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-foreground block text-sm font-semibold">
                    Rating
                  </FormLabel>
                  <div className="flex items-center gap-1.5 py-1">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const isActive =
                        hoverRating !== null
                          ? star <= hoverRating
                          : star <= field.value;
                      return (
                        <button
                          key={star}
                          type="button"
                          className="cursor-pointer p-1 transition-transform hover:scale-110"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(null)}
                          onClick={() => field.onChange(star)}
                        >
                          <Star
                            className={`size-8 ${
                              isActive
                                ? "fill-amber-500 text-amber-500"
                                : "text-zinc-300 dark:text-zinc-700"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {}
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-foreground block text-sm font-semibold">
                    Your Review
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      className="bg-background/80 border-border/50 text-foreground focus:ring-primary/40 h-auto w-full resize-none rounded-xl border p-3 text-sm focus:outline-none focus:ring-2"
                      placeholder="Write your review here (minimum 10 characters)..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full cursor-pointer font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
