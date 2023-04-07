/** @format */

import { TStore } from '../createStore';

export const selectorIsLoading = (store: TStore) => store.general.isLoading || false;

export const selectorText = (store: TStore) => store.general.text || '';
