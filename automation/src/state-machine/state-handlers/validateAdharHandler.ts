import { JobState } from '@anas/shared';
import { BaseStateHandler, FSMContext, AutomationFSM } from '../automation-fsm';

export class ValidatingAadhaarHandler extends BaseStateHandler {
  readonly state = JobState.VALIDATING_AADHAAR;

  async handle(
    context: FSMContext,
    _fsm: AutomationFSM,
  ): Promise<JobState | null> {

    if (!context.bot) {
      throw new Error('Bot not initialized');
    }

    await context.bot.validateAadhaar();

    return JobState.WAITING_FOR_OTP;
  }
}