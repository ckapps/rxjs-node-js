import { BehaviorSubject } from 'rxjs';

import { platform } from 'process';

const platformSubject = new BehaviorSubject<NodeJS.Platform>(platform);

/**
 * The platform on which the process is currently running
 */
export const platform$ = platformSubject.asObservable();
