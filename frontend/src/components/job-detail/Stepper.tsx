'use client';

import React from 'react';
import { JobState, STATE_ORDER } from '@anas/shared';
import { STATE_LABELS } from '@/lib/constants';
import {
  Check,
  AlertCircle,
  XCircle,
} from 'lucide-react';

interface StepperProps {
  currentStatus: JobState;
}

export function Stepper({ currentStatus }: StepperProps) {
  const activeIndex = STATE_ORDER.indexOf(currentStatus);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-lg font-bold text-slate-900">
          Automation Pipeline
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Track every stage of the automation process in real time.
        </p>
      </div>

      <div className="relative">
        {/* Progress Line */}
        <div className="absolute left-0 right-0 top-6 hidden lg:block h-[2px] bg-slate-200">
          <div
            className="h-full bg-emerald-500 transition-all duration-700"
            style={{
              width:
                activeIndex <= 0
                  ? '0%'
                  : `${(activeIndex / (STATE_ORDER.length - 1)) * 100}%`,
            }}
          />
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:gap-0">
          {STATE_ORDER.map((state, index) => {
            const isCompleted =
              index < activeIndex ||
              currentStatus === JobState.SUCCESS;

            const isActive = state === currentStatus;

            let circleStyle =
              'bg-white border-slate-300 text-slate-400';

            let icon = (
              <span className="font-semibold">
                {index + 1}
              </span>
            );

            if (isCompleted) {
              circleStyle =
                'bg-emerald-500 border-emerald-500 text-white shadow-md';

              icon = <Check className="h-5 w-5 stroke-[3]" />;
            }

            if (isActive) {
              switch (currentStatus) {
                case JobState.FAILED:
                  circleStyle =
                    'bg-red-600 border-red-600 text-white shadow-lg shadow-red-500/30';

                  icon = (
                    <AlertCircle className="h-5 w-5 stroke-[3]" />
                  );
                  break;

                case JobState.CANCELLED:
                  circleStyle =
                    'bg-slate-500 border-slate-500 text-white shadow-lg';

                  icon = (
                    <XCircle className="h-5 w-5 stroke-[3]" />
                  );
                  break;

                case JobState.SUCCESS:
                  circleStyle =
                    'bg-emerald-500 border-emerald-500 text-white shadow-lg';

                  icon = (
                    <Check className="h-5 w-5 stroke-[3]" />
                  );
                  break;

                default:
                  circleStyle =
                    'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/30 ring-4 ring-blue-500/20';

                  icon = (
                    <span className="animate-pulse font-bold">
                      {index + 1}
                    </span>
                  );
              }
            }

            return (
              <div
                key={state}
                className="relative flex flex-row items-center gap-5 lg:flex-1 lg:flex-col lg:items-center lg:text-center"
              >
                {/* Mobile Connector */}
                {index !== STATE_ORDER.length - 1 && (
                  <div className="absolute left-6 top-12 h-10 w-[2px] bg-slate-200 lg:hidden" />
                )}

                {/* Circle */}
                <div
                  className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 text-sm transition-all duration-300 ${circleStyle}`}
                >
                  {icon}
                </div>

                {/* Labels */}
                <div className="flex flex-col lg:items-center">
                  <span
                    className={`text-sm font-semibold ${
                      isActive
                        ? 'text-slate-900'
                        : isCompleted
                        ? 'text-slate-700'
                        : 'text-slate-500'
                    }`}
                  >
                    {STATE_LABELS[state]}
                  </span>

                  <span className="mt-1 text-xs text-slate-500">
                    {isCompleted
                      ? 'Completed'
                      : isActive
                      ? currentStatus === JobState.FAILED
                        ? 'Failed'
                        : currentStatus === JobState.CANCELLED
                        ? 'Cancelled'
                        : 'In Progress'
                      : 'Pending'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}