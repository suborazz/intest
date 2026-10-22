"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  ArrowLeft,
  Camera,
  CheckCircle2,
  Home,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Save,
  ShieldCheck,
  Upload,
  User,
} from "lucide-react";
import { axiosInstance } from "@/x/acfb3dca";

interface ProfileFormData {
  fullName: string;
  fatherMotherName: string;
  dateOfBirth: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  mobileNumber: string;
  alternateMobileNo: string;
  emailAddress: string;
  permLocalArea: string;
  permDistrict: string;
  permState: string;
  permCountry: string;
  permPinCode: string;
  currentAddressSameAsPerm: boolean;
  currLocalArea: string;
  currDistrict: string;
  currState: string;
  currCountry: string;
  currPinCode: string;
}

export default function ImmersionProfileEditPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [selectedPhotoFile, setSelectedPhotoFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      fullName: "",
      fatherMotherName: "",
      dateOfBirth: "",
      gender: "MALE",
      mobileNumber: "",
      alternateMobileNo: "",
      emailAddress: "",
      permLocalArea: "",
      permDistrict: "",
      permState: "",
      permCountry: "India",
      permPinCode: "",
      currentAddressSameAsPerm: false,
      currLocalArea: "",
      currDistrict: "",
      currState: "",
      currCountry: "India",
      currPinCode: "",
    },
  });

  const sameAsPerm = watch("currentAddressSameAsPerm");

  // Fetch current profile
  const { data: profileData, isLoading } = useQuery({
    queryKey: ["emersion", "profile"],
    queryFn: async () => {
      const res = await axiosInstance.get("/immersion-participant/profile");
      return res.data?.data;
    },
  });

  // Populate form with existing data
  useEffect(() => {
    if (profileData) {
      const p = profileData;
      let dobString = "";
      if (p.dateOfBirth) {
        try {
          dobString = new Date(p.dateOfBirth).toISOString().split("T")[0];
        } catch {
          dobString = p.dateOfBirth;
        }
      }

      reset({
        fullName: p.fullName || "",
        fatherMotherName: p.fatherMotherName || p.fatherSpouseName || "",
        dateOfBirth: dobString,
        gender:
          p.gender === "Female" || p.gender === "FEMALE"
            ? "FEMALE"
            : p.gender === "Other" || p.gender === "OTHER"
              ? "OTHER"
              : "MALE",
        mobileNumber: p.mobileNumber || p.mobileNo || "",
        alternateMobileNo: p.alternateMobileNo || "",
        emailAddress: p.emailAddress || "",
        permLocalArea: p.permLocalArea || p.permAddressLocal || "",
        permDistrict: p.permDistrict || p.permAddressDistrict || "",
        permState: p.permState || p.permAddressState || "",
        permCountry: p.permCountry || p.permAddressCountry || "India",
        permPinCode: p.permPinCode || p.permAddressPinCode || "",
        currentAddressSameAsPerm:
          p.currentAddressSameAsPerm ?? p.sameAsCurrentAddress ?? false,
        currLocalArea: p.currLocalArea || p.currentAddressLocal || "",
        currDistrict: p.currDistrict || p.currentAddressDistrict || "",
        currState: p.currState || p.currentAddressState || "",
        currCountry: p.currCountry || p.currentAddressCountry || "India",
        currPinCode: p.currPinCode || p.currentAddressPinCode || "",
      });

      const photo =
        p.passportPhotoUrl || p.photoUrl || (p as any).passportPhoto;
      if (photo) {
        setPhotoPreview(photo);
      }
    }
  }, [profileData, reset]);

  // Sync current address if sameAsPerm is checked
  useEffect(() => {
    if (sameAsPerm) {
      setValue("currLocalArea", watch("permLocalArea"));
      setValue("currDistrict", watch("permDistrict"));
      setValue("currState", watch("permState"));
      setValue("currCountry", watch("permCountry"));
      setValue("currPinCode", watch("permPinCode"));
    }
  }, [sameAsPerm, setValue, watch]);

  // Handle Photo selection
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image file size must be less than 2 MB");
      return;
    }

    setSelectedPhotoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Mutation for updating profile
  const updateMutation = useMutation({
    mutationFn: async (formDataValues: ProfileFormData) => {
      if (selectedPhotoFile) {
        const formData = new FormData();
        Object.entries(formDataValues).forEach(([k, v]) => {
          if (v !== undefined && v !== null) {
            formData.append(k, String(v));
          }
        });
        formData.append("passportPhoto", selectedPhotoFile);
        const res = await axiosInstance.patch(
          "/immersion-participant/profile",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        );
        return res.data;
      } else {
        const res = await axiosInstance.patch(
          "/immersion-participant/profile",
          formDataValues,
        );
        return res.data;
      }
    },
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["emersion"] });
      queryClient.invalidateQueries({ queryKey: ["auth", "profile"] });
      router.push("/immersion/profile");
    },
    onError: (err: any) => {
      const msg =
        err.response?.data?.error?.message ||
        err.response?.data?.message ||
        err.message ||
        "Failed to update profile";
      toast.error(msg);
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    const payload = { ...data };
    if (payload.currentAddressSameAsPerm) {
      payload.currLocalArea = payload.permLocalArea;
      payload.currDistrict = payload.permDistrict;
      payload.currState = payload.permState;
      payload.currCountry = payload.permCountry;
      payload.currPinCode = payload.permPinCode;
    }
    updateMutation.mutate(payload);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-3">
        <Loader2 className="size-8 animate-spin text-emerald-600" />
        <p className="text-muted-foreground text-sm font-semibold">
          Loading profile details...
        </p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in mx-auto max-w-5xl space-y-6 px-4 py-5 duration-300 md:px-6">
      {/* Top Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
        <Link
          href="/immersion/dashboard"
          className="flex items-center gap-1 hover:text-foreground transition-colors"
        >
          <Home className="size-3.5" />
          <span>Home</span>
        </Link>
        <span>&rsaquo;</span>
        <Link
          href="/immersion/profile"
          className="hover:text-foreground transition-colors"
        >
          Immersion Profile
        </Link>
        <span>&rsaquo;</span>
        <span className="text-foreground font-semibold">Edit Profile</span>
      </nav>

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-emerald-500/20 bg-white/70 dark:bg-zinc-900/50 p-5 shadow-xs backdrop-blur-md">
        <div className="flex items-center gap-3.5">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
            <User className="size-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
              Edit Immersion Profile
            </h1>
            <p className="text-xs text-muted-foreground">
              Update personal details, contact details, and address records.
            </p>
          </div>
        </div>

        <Link
          href="/immersion/profile"
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-foreground shadow-xs transition-colors hover:bg-muted"
        >
          <ArrowLeft className="size-3.5" />
          <span>Cancel & Back</span>
        </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Photo Upload Section */}
        <div className="rounded-2xl border border-border/70 bg-card p-5 sm:p-6 shadow-xs">
          <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
            Passport Photo
          </h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Recommended size: standard passport size portrait (under 2MB, JPG/PNG).
          </p>

          <div className="mt-4 flex flex-col sm:flex-row items-center gap-5">
            <div className="relative size-28 shrink-0 overflow-hidden rounded-2xl border-2 border-dashed border-emerald-500/40 bg-muted/40 shadow-inner">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Profile Preview"
                  className="size-full object-cover"
                />
              ) : (
                <div className="flex size-full flex-col items-center justify-center text-muted-foreground">
                  <Camera className="size-8 opacity-40" />
                  <span className="mt-1 text-[10px]">No Photo</span>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="photo-upload"
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-emerald-600/30 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-700 transition-colors hover:bg-emerald-500/20 dark:text-emerald-300"
              >
                <Upload className="size-3.5" />
                <span>Upload New Photo</span>
              </label>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="sr-only"
              />
              <span className="text-[11px] text-muted-foreground">
                {selectedPhotoFile ? selectedPhotoFile.name : "JPG, PNG or WEBP up to 2MB"}
              </span>
            </div>
          </div>
        </div>

        {/* Section: Personal Information */}
        <div className="rounded-2xl border border-border/70 bg-card p-5 sm:p-6 shadow-xs space-y-4">
          <div className="border-b border-border/50 pb-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
              Personal Information
            </h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Basic identification information used on certificates & ID cards.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Full Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                {...register("fullName", { required: "Full name is required" })}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
                placeholder="Candidate Full Name"
              />
              {errors.fullName && (
                <p className="mt-1 text-xs text-destructive">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Father / Spouse Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                {...register("fatherMotherName", {
                  required: "Father / Spouse name is required",
                })}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
                placeholder="Father or Spouse Name"
              />
              {errors.fatherMotherName && (
                <p className="mt-1 text-xs text-destructive">
                  {errors.fatherMotherName.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Date of Birth <span className="text-destructive">*</span>
              </label>
              <input
                type="date"
                {...register("dateOfBirth", {
                  required: "Date of birth is required",
                })}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
              />
              {errors.dateOfBirth && (
                <p className="mt-1 text-xs text-destructive">
                  {errors.dateOfBirth.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Gender <span className="text-destructive">*</span>
              </label>
              <select
                {...register("gender")}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other / Transgender</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Mobile Number <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <Phone className="pointer-events-none absolute left-3 top-2.5 size-4 text-muted-foreground" />
                <input
                  type="tel"
                  {...register("mobileNumber", {
                    required: "Mobile number is required",
                  })}
                  className="w-full rounded-lg border border-input bg-background pl-9 pr-3 py-2 text-sm outline-none transition-colors focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="10-digit mobile number"
                />
              </div>
              {errors.mobileNumber && (
                <p className="mt-1 text-xs text-destructive">
                  {errors.mobileNumber.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Alternate Mobile
              </label>
              <div className="relative">
                <Phone className="pointer-events-none absolute left-3 top-2.5 size-4 text-muted-foreground" />
                <input
                  type="tel"
                  {...register("alternateMobileNo")}
                  className="w-full rounded-lg border border-input bg-background pl-9 pr-3 py-2 text-sm outline-none transition-colors focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="Secondary / emergency contact"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Email Address
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-2.5 size-4 text-muted-foreground" />
                <input
                  type="email"
                  {...register("emailAddress")}
                  className="w-full rounded-lg border border-input bg-background pl-9 pr-3 py-2 text-sm outline-none transition-colors focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="name@example.com"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section: Permanent Address */}
        <div className="rounded-2xl border border-border/70 bg-card p-5 sm:p-6 shadow-xs space-y-4">
          <div className="border-b border-border/50 pb-3 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
                Permanent Address
              </h2>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Official residential address as on identity proof documents.
              </p>
            </div>
            <MapPin className="size-4 text-emerald-600" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Street / Village / Local Area <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                {...register("permLocalArea", {
                  required: "Permanent address local area is required",
                })}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
                placeholder="House No, Landmark, Village or Street"
              />
              {errors.permLocalArea && (
                <p className="mt-1 text-xs text-destructive">
                  {errors.permLocalArea.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                District <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                {...register("permDistrict", {
                  required: "District is required",
                })}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
                placeholder="e.g. Patna, Varanasi, Jaipur"
              />
              {errors.permDistrict && (
                <p className="mt-1 text-xs text-destructive">
                  {errors.permDistrict.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                State <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                {...register("permState", { required: "State is required" })}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
                placeholder="e.g. Bihar, Uttar Pradesh"
              />
              {errors.permState && (
                <p className="mt-1 text-xs text-destructive">
                  {errors.permState.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Country
              </label>
              <input
                type="text"
                {...register("permCountry")}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
                placeholder="India"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Pin Code <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                {...register("permPinCode", {
                  required: "Pin Code is required",
                  pattern: {
                    value: /^\d{6}$/,
                    message: "Pin Code must be 6 digits",
                  },
                })}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
                placeholder="6-digit postal code"
              />
              {errors.permPinCode && (
                <p className="mt-1 text-xs text-destructive">
                  {errors.permPinCode.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Section: Current Address */}
        <div className="rounded-2xl border border-border/70 bg-card p-5 sm:p-6 shadow-xs space-y-4">
          <div className="border-b border-border/50 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
                Current Address
              </h2>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Current correspondence address for communication.
              </p>
            </div>

            <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
              <input
                type="checkbox"
                {...register("currentAddressSameAsPerm")}
                className="size-4 rounded border-emerald-600 text-emerald-600 focus:ring-emerald-500"
              />
              <span>Same as Permanent Address</span>
            </label>
          </div>

          {!sameAsPerm && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-2 animate-in fade-in duration-200">
              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Street / Village / Local Area
                </label>
                <input
                  type="text"
                  {...register("currLocalArea")}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="Local area, hostel or flat"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  District
                </label>
                <input
                  type="text"
                  {...register("currDistrict")}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="District"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  State
                </label>
                <input
                  type="text"
                  {...register("currState")}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="State"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Country
                </label>
                <input
                  type="text"
                  {...register("currCountry")}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="India"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Pin Code
                </label>
                <input
                  type="text"
                  {...register("currPinCode")}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="6-digit pin code"
                />
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="sticky bottom-4 z-20 flex items-center justify-between gap-3 rounded-2xl border border-emerald-500/30 bg-card/95 p-4 shadow-xl backdrop-blur-md">
          <Link
            href="/immersion/profile"
            className="rounded-lg border border-border bg-background px-5 py-2.5 text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={updateMutation.isPending}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:bg-emerald-700 active:scale-98 disabled:opacity-50"
          >
            {updateMutation.isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Saving Changes...</span>
              </>
            ) : (
              <>
                <Save className="size-4" />
                <span>Save Profile Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
