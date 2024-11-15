import { Observable, Frame } from '@nativescript/core';

export class TrainingClassesViewModel extends Observable {
    private _selectedTab: string = 'learning';

    constructor() {
        super();
    }

    onTabSelect(args: any) {
        const tab = args.object.get('data-tab');
        this._selectedTab = tab;
        this.notifyPropertyChange('selectedTab', tab);
    }

    onVIPAccess() {
        Frame.topmost().navigate({
            moduleName: 'pages/vip-premium-page',
            transition: { name: 'slide' }
        });
    }

    onCourseSelect(args: any) {
        const courseId = args.object.get('data-course');
        Frame.topmost().navigate({
            moduleName: 'pages/course-detail-page',
            context: { courseId },
            transition: { name: 'slide' }
        });
    }

    get selectedTab(): string {
        return this._selectedTab;
    }
}