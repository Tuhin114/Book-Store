"use client";

import { useState } from "react";
import { Check, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: "details", label: "Details" },
  { id: "media", label: "Media" },
  { id: "pricing", label: "Pricing" },
  { id: "content", label: "Content" },
  { id: "scheduling", label: "Scheduling" },
];

const AddBookModal = ({ open, onOpenChange, onSuccess }) => {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    date: "", // we'll use this to derive publishYear
    // category: "",
    // status: "draft",
    // cover: "/placeholder.svg",
  });
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const isLastStep = step === STEPS.length - 1;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validateCurrentStep = () => {
    const newErrors = {};
    let isValid = true;

    if (step === 0) {
      if (!formData.title.trim()) {
        newErrors.title = "Title is required";
        isValid = false;
      }
      if (!formData.author.trim()) {
        newErrors.author = "Author is required";
        isValid = false;
      }
      if (!formData.date.trim()) {
        newErrors.date = "Published date is required";
        isValid = false;
      }
    }
    if (step === 4 && formData.status === "scheduled" && !formData.date) {
      newErrors.date = "Date is required for scheduled books";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateCurrentStep()) setStep((s) => s + 1);
  };

  const handleBack = () => {
    setStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;
    setIsSubmitting(true);

    // derive publishYear
    const publishYear = new Date(formData.date).getFullYear();

    const payload = {
      title: formData.title,
      author: formData.author,
      publishYear,
      // If your API later supports extra fields, you can uncomment:
      // category: formData.category,
      // status: formData.status,
      // cover: formData.cover,
    };

    try {
      const res = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Failed to add book:", text);
        // you could show a toast here
      } else {
        // success!
        onOpenChange(false);
        onSuccess?.();
        // optional: navigate back to list
        router.push("/");
      }
    } catch (err) {
      console.error("Error submitting:", err);
      // show toast if you have one
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <div className="grid gap-4">
            {/* Title */}
            <div className="grid gap-2">
              <Label htmlFor="title">
                Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter book title"
                className={cn(errors.title && "border-red-500")}
              />
              {errors.title && (
                <p className="text-xs text-red-500">{errors.title}</p>
              )}
            </div>

            {/* Author */}
            <div className="grid gap-2">
              <Label htmlFor="author">
                Author <span className="text-red-500">*</span>
              </Label>
              <Input
                id="author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                placeholder="Enter author name"
                className={cn(errors.author && "border-red-500")}
              />
              {errors.author && (
                <p className="text-xs text-red-500">{errors.author}</p>
              )}
            </div>

            {/* Date (used as publishYear) */}
            <div className="grid gap-2">
              <Label htmlFor="date">
                Published Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                className={cn(errors.date && "border-red-500")}
              />
              {errors.date && (
                <p className="text-xs text-red-500">{errors.date}</p>
              )}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="grid gap-4">
            <Label>Media</Label>
            {/* Dummy / placeholder */}
            <div className="text-sm text-muted-foreground">
              (Media upload not yet supported. Will default to placeholder
              cover.)
            </div>
          </div>
        );

      case 2:
        return (
          <div className="grid gap-4">
            <Label>Pricing</Label>
            <div className="text-sm text-muted-foreground">
              (Pricing isn’t hooked up yet; will default to free.)
            </div>
          </div>
        );

      case 3:
        return (
          <div className="grid gap-4">
            <Label>Description</Label>
            <textarea
              name="description"
              className="min-h-24 w-full rounded-md border bg-background px-3 py-2 text-sm"
              placeholder="Enter book description (optional)"
            />
          </div>
        );

      case 4:
        return (
          <div className="grid gap-4">
            <Label>Scheduling</Label>
            <div className="text-sm text-muted-foreground">
              (Will be published immediately on add.)
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Add New Book</DialogTitle>
          <DialogClose className="absolute right-4 top-4 opacity-70 hover:opacity-100">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-[200px_1fr]">
          {/* Step indicator */}
          <div className="hidden md:block">
            <div className="flex flex-col gap-2">
              {STEPS.map((s, i) => (
                <div
                  key={s.id}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2",
                    step === i && "bg-primary/10 text-primary",
                    i < step && "text-primary"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full border",
                      step === i && "border-primary bg-primary/10",
                      i < step &&
                        "border-primary bg-primary text-primary-foreground"
                    )}
                  >
                    {i < step ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <span className="text-xs">{i + 1}</span>
                    )}
                  </div>
                  <span className="text-sm font-medium">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile step indicator */}
          <div className="md:hidden">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-medium">
                Step {step + 1} of {STEPS.length}: {STEPS[step].label}
              </p>
              <div className="text-sm text-muted-foreground">
                {step + 1}/{STEPS.length}
              </div>
            </div>
            <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Form content */}
          <div className="flex flex-col">
            <div className="flex-1">{renderStepContent()}</div>
            <div className="mt-6 flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === 0}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
              </Button>

              {isLastStep ? (
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <svg
                        className="mr-2 h-4 w-4 animate-spin"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>
                      Save & Close
                      <Check className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              ) : (
                <Button onClick={handleNext}>
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddBookModal;
