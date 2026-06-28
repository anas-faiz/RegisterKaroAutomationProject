import { JobState } from '@anas/shared';
import { BaseStateHandler, FSMContext, AutomationFSM } from '../automation-fsm';

export class GeneratingCredentialsHandler extends BaseStateHandler {
  readonly state = JobState.GENERATING_CREDENTIALS;
 
  async handle(
    context: FSMContext,
    _fsm: AutomationFSM,
  ): Promise<JobState | null> {
    if (!context.bot) {
      throw new Error('Bot not initialized');
    }
 

    // Set the password on the portal
    const { password } = await context.bot.setNewPassword();

    // Store credentials in FSM context
    context.generatedCredentials = {
      userId: context.pan, // Replace with await context.bot.getUserId() if you extract it
      password,
    };

    return JobState.SUCCESS;
  }
}