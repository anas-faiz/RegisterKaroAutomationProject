import { JobState } from '@anas/shared';
import { BaseStateHandler, FSMContext, AutomationFSM } from '../automation-fsm';

export class ReEnteringPanHandler extends BaseStateHandler {
  readonly state = JobState.REENTERING_PAN;

  async handle(
    context: FSMContext,
    _fsm: AutomationFSM,
  ): Promise<JobState | null> {
    if (!context.bot) {
      throw new Error('Bot not initialized');
    }

    await context.bot.reEnterPan(context.pan);

    return JobState.WAITING_FOR_OTP;
  }
}