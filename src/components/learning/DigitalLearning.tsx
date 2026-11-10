import React, { useState, useEffect } from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useAuth } from '../../context/AuthContext';
import { getTranslation } from '../../utils/translations';
import { LEARNING_COURSES } from '../../data/courses';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  ChevronRight,
  Sparkles,
  Volume2,
  Award,
  Smartphone,
  MessageSquare,
  Mail,
  ShieldAlert,
  CreditCard,
  Laptop,
  Video,
  FileCheck,
  RotateCcw,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Course, Lesson } from '../../types';

export const DigitalLearning: React.FC = () => {
  const { language, speak, playTapSound } = useAccessibility();
  const { userProfile } = useAuth();
  const t = getTranslation(language);

  const [selectedCourse, setSelectedCourse] = useState<Course>(LEARNING_COURSES[0]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson>(LEARNING_COURSES[0].lessons[0]);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(['touch-gestures']);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // Load progress from backend
  useEffect(() => {
    if (!userProfile?.uid) return;
    fetch(`/api/progress/${userProfile.uid}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.completedLessonIds) {
          setCompletedLessonIds(data.completedLessonIds);
        }
      })
      .catch(() => {});
  }, [userProfile?.uid]);

  const handleSelectCourse = (course: Course) => {
    playTapSound();
    setSelectedCourse(course);
    setSelectedLesson(course.lessons[0]);
    setSelectedQuizOption(null);
    setQuizSubmitted(false);
  };

  const handleSelectLesson = (lesson: Lesson) => {
    playTapSound();
    setSelectedLesson(lesson);
    setSelectedQuizOption(null);
    setQuizSubmitted(false);
  };

  const handleCompleteLesson = () => {
    playTapSound();
    if (!completedLessonIds.includes(selectedLesson.id)) {
      setCompletedLessonIds((prev) => [...prev, selectedLesson.id]);
    }

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }

    // Sync to backend
    fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: userProfile?.uid || 'demo-elder-dadi',
        lessonId: selectedLesson.id,
        isCompleted: true,
      }),
    }).catch(() => {});
  };

  const handleReadLesson = () => {
    playTapSound();
    const title = selectedLesson.title[language] || selectedLesson.title.en;
    const summary = selectedLesson.summary[language] || selectedLesson.summary.en;
    const steps = selectedLesson.steps
      .map(
        (s, i) =>
          `Step ${i + 1}: ${s.title[language] || s.title.en}. ${
            s.description[language] || s.description.en
          }`
      )
      .join('. ');

    speak(`${title}. ${summary}. ${steps}`);
  };

  const getCourseIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone':
        return Smartphone;
      case 'MessageSquare':
        return MessageSquare;
      case 'Mail':
        return Mail;
      case 'ShieldAlert':
        return ShieldAlert;
      case 'CreditCard':
        return CreditCard;
      case 'Laptop':
        return Laptop;
      case 'Video':
        return Video;
      default:
        return FileCheck;
    }
  };

  const isCurrentCompleted = completedLessonIds.includes(selectedLesson.id);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
      {/* Academy Banner */}
      <div className="bg-gradient-to-r from-indigo-700 via-blue-700 to-indigo-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-black uppercase tracking-wider">
            Senior Digital Academy
          </span>
          <span className="px-3 py-1 bg-amber-400 text-amber-950 rounded-full text-xs font-black flex items-center gap-1">
            <Award className="w-3.5 h-3.5" />
            {completedLessonIds.length} Lessons Mastered
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black tracking-tight">{t.nav.learning}</h2>
        <p className="text-indigo-100 text-sm sm:text-base font-medium max-w-2xl mt-1">
          Patient, step-by-step guides for smartphones, WhatsApp, UPI payments, and government services.
        </p>
      </div>

      {/* Main Grid: Left Category Picker & Right Lesson Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Categories List (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <span>Select Course Topic ({LEARNING_COURSES.length} Modules):</span>
          </h3>

          <div className="space-y-2.5">
            {LEARNING_COURSES.map((course) => {
              const Icon = getCourseIcon(course.iconName);
              const isSelected = selectedCourse.id === course.id;
              const completedCount = course.lessons.filter((l) =>
                completedLessonIds.includes(l.id)
              ).length;

              return (
                <button
                  key={course.id}
                  onClick={() => handleSelectCourse(course)}
                  className={`w-full p-4 rounded-2xl border-2 text-left flex items-center justify-between transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50 border-blue-600 shadow-md ring-2 ring-blue-300'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">
                        {course.title[language] || course.title.en}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">
                        {completedCount} of {course.lessons.length} finished
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Course Lessons & Reader (7 cols) */}
        <div className="lg:col-span-7 bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          {/* Sub-lesson pill selector */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Lessons in this module:
            </span>
            <div className="flex flex-wrap gap-2">
              {selectedCourse.lessons.map((lesson) => {
                const isSelected = selectedLesson.id === lesson.id;
                const isDone = completedLessonIds.includes(lesson.id);

                return (
                  <button
                    key={lesson.id}
                    onClick={() => handleSelectLesson(lesson)}
                    className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-sm'
                        : isDone
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                    <span>{lesson.title[language] || lesson.title.en}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Lesson Header */}
          <div className="pt-2 border-t border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-blue-600 uppercase tracking-wider flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {selectedLesson.durationMinutes} min reading
              </span>
              <button
                onClick={handleReadLesson}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Volume2 className="w-4 h-4 text-blue-600" />
                <span>Read Lesson Aloud</span>
              </button>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {selectedLesson.title[language] || selectedLesson.title.en}
            </h3>

            <p className="text-base sm:text-lg text-slate-600 font-medium">
              {selectedLesson.summary[language] || selectedLesson.summary.en}
            </p>
          </div>

          {/* Step by step cards */}
          <div className="space-y-4">
            <h4 className="font-black text-slate-900 text-lg uppercase tracking-wider text-xs text-slate-500">
              Step-by-Step Instructions:
            </h4>

            {selectedLesson.steps.map((step, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200/80 space-y-2"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-black text-sm flex items-center justify-center shrink-0">
                    {idx + 1}
                  </div>
                  <h5 className="font-bold text-base sm:text-lg text-slate-900">
                    {step.title[language] || step.title.en}
                  </h5>
                </div>
                <p className="text-base text-slate-700 pl-11 font-medium leading-relaxed">
                  {step.description[language] || step.description.en}
                </p>
                {step.tip && (
                  <div className="ml-11 mt-2 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 font-semibold">
                    💡 <strong>Gentle Tip:</strong> {step.tip[language] || step.tip.en}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Knowledge Check Quiz */}
          {selectedLesson.knowledgeCheck && (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 space-y-4">
              <span className="text-xs font-black uppercase tracking-wider text-blue-700 flex items-center gap-1">
                <Sparkles className="w-4 h-4" />
                Quick Knowledge Check
              </span>
              <h5 className="text-base sm:text-lg font-bold text-slate-900">
                {selectedLesson.knowledgeCheck.question[language] ||
                  selectedLesson.knowledgeCheck.question.en}
              </h5>

              <div className="space-y-2">
                {selectedLesson.knowledgeCheck.options.map((opt, optIdx) => {
                  const isSelected = selectedQuizOption === optIdx;
                  const isCorrect =
                    selectedLesson.knowledgeCheck?.correctIndex === optIdx;

                  let optClass = 'bg-white border-slate-200 text-slate-800';
                  if (quizSubmitted) {
                    if (isCorrect) optClass = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold';
                    else if (isSelected) optClass = 'bg-rose-100 border-rose-400 text-rose-950';
                  } else if (isSelected) {
                    optClass = 'bg-blue-600 border-blue-600 text-white font-bold';
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={quizSubmitted}
                      onClick={() => {
                        playTapSound();
                        setSelectedQuizOption(optIdx);
                      }}
                      className={`w-full p-3.5 rounded-xl border-2 text-left text-sm sm:text-base font-semibold transition-all cursor-pointer ${optClass}`}
                    >
                      {opt[language] || opt.en}
                    </button>
                  );
                })}
              </div>

              {!quizSubmitted ? (
                <button
                  disabled={selectedQuizOption === null}
                  onClick={() => {
                    playTapSound();
                    setQuizSubmitted(true);
                  }}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold text-sm rounded-xl cursor-pointer"
                >
                  Check My Answer
                </button>
              ) : (
                <div className="p-3 bg-white rounded-xl border border-blue-200 text-sm font-medium text-slate-700">
                  {selectedLesson.knowledgeCheck.explanation[language] ||
                    selectedLesson.knowledgeCheck.explanation.en}
                </div>
              )}
            </div>
          )}

          {/* Mark Complete Button */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold">
              Take your time. You can review this lesson anytime.
            </span>

            <button
              onClick={handleCompleteLesson}
              className={`px-6 py-3.5 rounded-2xl font-black text-base flex items-center gap-2 shadow-md transition-all cursor-pointer ${
                isCurrentCompleted
                  ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20 active:scale-95'
              }`}
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>{isCurrentCompleted ? 'Completed! Review Again' : 'Mark Lesson Complete'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
