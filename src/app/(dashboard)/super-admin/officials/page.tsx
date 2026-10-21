"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  Plus,
  Pencil,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  Search,
  CheckCircle2,
  XCircle,
  Loader2,
  AlertCircle,
  Hash,
} from "lucide-react";
import { toast } from "sonner";
import { axiosInstance } from "@/x/acfb3dca";

interface Official {
  id: string;
  slNo: number;
  name: string;
  designation: string;
  workingLocation: string;
  mobile: string;
  email: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function OfficialsAdminPage() {
  const [officials, setOfficials] = useState<Official[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOfficial, setEditingOfficial] = useState<Official | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Delete modal
  const [deleteTarget, setDeleteTarget] = useState<Official | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Form fields
  const [formData, setFormData] = useState({
    slNo: 1,
    name: "",
    designation: "",
    workingLocation: "",
    mobile: "",
    email: "",
    isActive: true,
  });

  const fetchOfficials = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/officials?all=true");
      if (res.data.success) {
        setOfficials(res.data.data || []);
      }
    } catch (err: any) {
      console.error("Failed to load officials", err);
      toast.error(err?.response?.data?.error?.message || "Failed to load officials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOfficials();
  }, []);

  const openAddModal = () => {
    setEditingOfficial(null);
    const nextSlNo =
      officials.length > 0 ? Math.max(...officials.map((o) => o.slNo || 0)) + 1 : 1;
    setFormData({
      slNo: nextSlNo,
      name: "",
      designation: "",
      workingLocation: "",
      mobile: "",
      email: "",
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (official: Official) => {
    setEditingOfficial(official);
    setFormData({
      slNo: official.slNo,
      name: official.name,
      designation: official.designation,
      workingLocation: official.workingLocation,
      mobile: official.mobile || "",
      email: official.email || "",
      isActive: official.isActive,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Please enter the official's name");
      return;
    }
    if (!formData.designation.trim()) {
      toast.error("Please enter the designation");
      return;
    }
    if (!formData.workingLocation.trim()) {
      toast.error("Please enter the working location");
      return;
    }

    try {
      setIsSubmitting(true);
      if (editingOfficial) {
        const res = await axiosInstance.patch(`/officials/${editingOfficial.id}`, formData);
        if (res.data.success) {
          toast.success("Official updated successfully!");
          setIsModalOpen(false);
          fetchOfficials();
        }
      } else {
        const res = await axiosInstance.post("/officials", formData);
        if (res.data.success) {
          toast.success("Official added successfully!");
          setIsModalOpen(false);
          fetchOfficials();
        }
      }
    } catch (err: any) {
      console.error("Error saving official:", err);
      toast.error(err?.response?.data?.error?.message || "Failed to save official");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      setIsDeleting(true);
      const res = await axiosInstance.delete(`/officials/${deleteTarget.id}`);
      if (res.data.success) {
        toast.success("Official deleted successfully!");
        setDeleteTarget(null);
        fetchOfficials();
      }
    } catch (err: any) {
      console.error("Error deleting official:", err);
      toast.error(err?.response?.data?.error?.message || "Failed to delete official");
    } finally {
      setIsDeleting(false);
    }
  };

  const toggleStatus = async (official: Official) => {
    try {
      const res = await axiosInstance.patch(`/officials/${official.id}`, {
        isActive: !official.isActive,
      });
      if (res.data.success) {
        toast.success(`Status updated to ${!official.isActive ? "Active" : "Inactive"}`);
        fetchOfficials();
      }
    } catch (err: any) {
      toast.error("Failed to update status");
    }
  };

  const filteredOfficials = officials.filter((o) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      o.name.toLowerCase().includes(q) ||
      o.designation.toLowerCase().includes(q) ||
      o.workingLocation.toLowerCase().includes(q) ||
      o.mobile.toLowerCase().includes(q) ||
      o.email.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-slate-50/60 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20">
              <Users className="size-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                Institution Officials
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                संस्थान के अन्य पदाधिकारीगण (Officials from Our Institution)
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-600/25 transition-all hover:bg-emerald-700 hover:shadow-lg active:scale-95"
        >
          <Plus className="size-4" />
          <span>Add New Official</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, designation, location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pl-9 pr-4 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>Total: <strong>{officials.length}</strong></span>
          <span>•</span>
          <span className="text-emerald-700">Active: <strong>{officials.filter((o) => o.isActive).length}</strong></span>
        </div>
      </div>

      {/* Main Content Table / List */}
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <Loader2 className="size-8 animate-spin text-emerald-600 mb-2" />
            <p className="text-sm font-medium">Loading officials...</p>
          </div>
        ) : filteredOfficials.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center px-4">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mb-3">
              <Users className="size-7" />
            </div>
            <h3 className="text-base font-bold text-slate-800">No Officials Found</h3>
            <p className="mt-1 text-xs text-slate-500 max-w-sm">
              {searchQuery
                ? "No official matches your search query."
                : "No officials have been added yet. Click 'Add New Official' to create the first record."}
            </p>
            {!searchQuery && (
              <button
                onClick={openAddModal}
                className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 transition"
              >
                <Plus className="size-3.5" /> Add Official
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200/80 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                  <th className="py-3.5 px-4 text-center w-14">Sl. No.</th>
                  <th className="py-3.5 px-4">Name</th>
                  <th className="py-3.5 px-4">Designation</th>
                  <th className="py-3.5 px-4">Working Location</th>
                  <th className="py-3.5 px-4">Contact (Mobile &amp; Email)</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredOfficials.map((official) => (
                  <tr
                    key={official.id}
                    className="transition hover:bg-slate-50/80 group"
                  >
                    <td className="py-3.5 px-4 text-center font-bold text-slate-500">
                      #{official.slNo}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{official.name}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="inline-flex items-center gap-1.5 font-medium text-slate-700">
                        <Briefcase className="size-3.5 text-emerald-600 shrink-0" />
                        <span>{official.designation}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="inline-flex items-center gap-1.5 text-slate-600">
                        <MapPin className="size-3.5 text-amber-600 shrink-0" />
                        <span>{official.workingLocation}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex flex-col gap-1 text-xs">
                        {official.mobile ? (
                          <a
                            href={`tel:${official.mobile}`}
                            className="inline-flex items-center gap-1.5 text-emerald-700 hover:underline font-medium"
                          >
                            <Phone className="size-3 shrink-0" />
                            <span>{official.mobile}</span>
                          </a>
                        ) : (
                          <span className="text-slate-400 italic">No mobile</span>
                        )}
                        {official.email ? (
                          <a
                            href={`mailto:${official.email}`}
                            className="inline-flex items-center gap-1.5 text-slate-600 hover:text-emerald-700 hover:underline"
                          >
                            <Mail className="size-3 shrink-0" />
                            <span>{official.email}</span>
                          </a>
                        ) : (
                          <span className="text-slate-400 italic">No email</span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => toggleStatus(official)}
                        title="Click to toggle status"
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold transition ${
                          official.isActive
                            ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {official.isActive ? (
                          <>
                            <CheckCircle2 className="size-3" /> Active
                          </>
                        ) : (
                          <>
                            <XCircle className="size-3" /> Inactive
                          </>
                        )}
                      </button>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => openEditModal(official)}
                          className="rounded-lg p-2 text-slate-500 hover:bg-emerald-50 hover:text-emerald-700 transition"
                          title="Edit Official"
                        >
                          <Pencil className="size-4" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(official)}
                          className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600 transition"
                          title="Delete Official"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl border border-slate-100">
            <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <Users className="size-4" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {editingOfficial ? "Edit Official Details" : "Add New Official"}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {editingOfficial
                      ? "Update institution official information"
                      : "Add a representative to the Officials list"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1">
                  <label className="mb-1 block text-xs font-bold text-slate-700">
                    Sl. No. *
                  </label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-slate-400" />
                    <input
                      type="number"
                      min={1}
                      required
                      value={formData.slNo}
                      onChange={(e) =>
                        setFormData({ ...formData, slNo: parseInt(e.target.value, 10) || 1 })
                      }
                      className="w-full rounded-xl border border-slate-200 py-2 pl-8 pr-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="mb-1 block text-xs font-bold text-slate-700">
                    Name (नाम) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Rajesh Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 py-2 px-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700">
                  Designation (पद) *
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Director / Center Coordinator / Dean"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700">
                  Working Location (कार्य स्थल) *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Patna, Bihar / Lucknow / Remote"
                    value={formData.workingLocation}
                    onChange={(e) =>
                      setFormData({ ...formData, workingLocation: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700">
                    Mobile No. (मोबाइल नं.)
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700">
                    Email ID (ईमेल आईडी)
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      placeholder="e.g. official@iiinternship.in"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="size-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <label htmlFor="isActive" className="text-xs font-medium text-slate-700">
                  Active (Show on public Team Members page)
                </label>
              </div>

              <div className="mt-6 flex items-center justify-end gap-2.5 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-700 disabled:opacity-50 transition"
                >
                  {isSubmitting && <Loader2 className="size-3.5 animate-spin" />}
                  {editingOfficial ? "Save Changes" : "Create Official"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-red-100 text-red-600 mb-3">
              <AlertCircle className="size-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Delete Official?</h3>
            <p className="mt-1 text-xs text-slate-500">
              Are you sure you want to delete <strong>{deleteTarget.name}</strong>? This action cannot be undone.
            </p>
            <div className="mt-5 flex items-center justify-center gap-2.5">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="inline-flex items-center gap-1.5 rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-red-600/20 hover:bg-red-700 disabled:opacity-50 transition"
              >
                {isDeleting && <Loader2 className="size-3.5 animate-spin" />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
