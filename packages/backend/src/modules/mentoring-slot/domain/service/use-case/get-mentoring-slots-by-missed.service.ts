import MentoringSlot from '@src/modules/mentoring-slot/domain/model/entity/mentoring-slot.entity';
import { MentoringSlotRepositoryInterface } from '@src/modules/mentoring-slot/domain/port/db/mentoring-slot.repository.interface';

export class GetMentoringSlotsByMissedService {
  constructor(private readonly mentoringSlotRepository: MentoringSlotRepositoryInterface){}
  async getMentoringSlotsByMissed(isUserAuthenticated: boolean = true): Promise<MentoringSlot[]> {
    if (!isUserAuthenticated) {
      throw new Error('User is not authenticated');
    }


    const mentoringSlots = await this.mentoringSlotRepository.findMentoringSlotsByMissed();
    return mentoringSlots;
  }
}
