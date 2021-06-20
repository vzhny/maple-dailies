type MoveDirection = 'up' | 'down';

interface DailyEvent {
  listId: number;
  listTitle: string | null;
  characterWideFlag: boolean;
}

interface AddDailyEvent extends DailyEvent {}

interface EditDailyEvent extends DailyEvent {
  index: number;
}

interface MoveDailyEvent extends DailyEvent {
  fromIndex: number;
  toIndex: number;
}

interface DeleteDailyListEvent extends DailyEvent {}

interface ToggleCompletionEvent extends DailyEvent {
  index: number;
  completion: boolean;
}

interface ToggleAllCompletionEvent extends DailyEvent {
  allCompleted: boolean;
}

interface ToggleVisibilityEvent extends DailyEvent {
  index: number;
  visibility: boolean;
}

interface DailyList {
  dailyListId: number;
  characterId: number;
  title: string;
  dailies: Daily[];
  systemFlag: boolean;
}

interface Daily {
  dailyListId: number;
  text: string;
  completed: boolean;
  hidden: boolean;
}

export {
  MoveDirection,
  AddDailyEvent,
  EditDailyEvent,
  MoveDailyEvent,
  DeleteDailyListEvent,
  ToggleCompletionEvent,
  ToggleAllCompletionEvent,
  ToggleVisibilityEvent,
  DailyList,
  Daily,
};
