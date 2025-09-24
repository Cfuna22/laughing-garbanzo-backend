import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FeedbackService } from '../feedback.service';
import { Feedback } from './feedback.types';
import { CreateFeedbackInput, UpdateFeedbackInput } from '../dto/feedback.dto';

@Resolver(() => Feedback)
export class FeedbackResolver {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Query(() => [Feedback])
  async getFeedbacks() {
    return this.feedbackService.findAll();
  }

  @Query(() => Feedback, { nullable: true })
  async getFeedback(@Args('id') id: string) {
    return this.feedbackService.findOne(+id);
  }

  @Mutation(() => Feedback)
  async createFeedback(@Args('data') data: CreateFeedbackInput) {
    return this.feedbackService.create({
      ...data,
      rating: Number(data.rating),
    });
  }

  @Mutation(() => Feedback, { nullable: true })
  async updateFeedback(
    @Args('id') id: string,
    @Args('data') data: UpdateFeedbackInput,
  ) {
    return this.feedbackService.update(+id, data);
  }

  @Mutation(() => Boolean)
  async deleteFeedback(@Args('id', { type: () => String }) id: string) {
    return this.feedbackService.remove(+id);
  }
}
