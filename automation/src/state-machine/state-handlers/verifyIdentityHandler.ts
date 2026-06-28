import { JobState } from '@anas/shared';
import { BaseStateHandler, FSMContext, AutomationFSM } from '../automation-fsm';

export class VerifyIdentityHandler extends BaseStateHandler {
  readonly state = JobState.VERIFYING_IDENTITY;

  async handle(
    context: FSMContext,
    _fsm: AutomationFSM,
  ): Promise<JobState | null> {
    if (!context.bot) {
      throw new Error('Bot not initialized');
    }

    // Select "OTP on mobile number registered with Aadhaar"
    // and click Continue
    await context.bot.verifyIdentity();

    // OTP is now sent to the user
    return JobState.GENERATING_OTP;
  }
}