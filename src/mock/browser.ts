import { setupWorker } from "msw/browser";
import {addReview, reviewsById} from "@/mock/review.ts";
import {bestBooks} from "@/mock/books.ts";

const handlers = [reviewsById, addReview, bestBooks];

export const worker = setupWorker(...handlers);
