import { ReactNode } from 'react';

export interface CustomContentViewProvider {
    customViewFromName(viewName: string): ReactNode;
    visibilityFromRule(ruleName: string, ruleValue: string): boolean;
}