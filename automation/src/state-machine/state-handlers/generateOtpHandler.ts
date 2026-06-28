import { JobState } from "@anas/shared";
import { AutomationFSM, BaseStateHandler, FSMContext } from "../automation-fsm";


export class GenerateOtpHandler extends BaseStateHandler {
  readonly state = JobState.GENERATING_OTP;

  async handle(
    context: FSMContext,
    _fsm: AutomationFSM,
  ): Promise<JobState | null> {

    if (!context.bot) {
      throw new Error('Bot not initialized');
    }

    await context.bot.generateOtp();

    return JobState.VALIDATING_AADHAAR;
  }
}