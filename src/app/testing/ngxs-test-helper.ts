import { SnippetState } from '../state/snippet/snippet.state';
import { LabelState } from '../state/label/label.state';
import { LanguageState } from '../state/language/language.state';
import { TeamState } from '../state/team/team.state';
import { ScopeState } from '../state/scope/scope.state';

/**
 * All application states for NGXS testing
 * Use this in tests: NgxsModule.forRoot(ALL_STATES)
 */
export const ALL_STATES = [ScopeState, LanguageState, LabelState, SnippetState, TeamState];
