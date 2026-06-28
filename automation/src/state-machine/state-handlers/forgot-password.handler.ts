// opening-forgot-password.handler.ts

import { JobState } from '@anas/shared';
import { BaseStateHandler, FSMContext, AutomationFSM } from '../automation-fsm';

export class OpeningForgotPasswordHandler extends BaseStateHandler {
  readonly state = JobState.OPENING_FORGOT_PASSWORD;

  async handle(
    context: FSMContext,
    _fsm: AutomationFSM,
  ): Promise<JobState | null> {
    if (!context.bot) {
      throw new Error('Bot not initialized');
    }

    await context.bot.clickForgotPassword();

    return JobState.REENTERING_PAN;
  }
}