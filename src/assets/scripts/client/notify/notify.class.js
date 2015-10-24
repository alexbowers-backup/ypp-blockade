class Notify {
    constructor(object) {
        object = object || {};

        if(object.title == null || object.body == null) {
            console.error("Notification posted without title or body");
            return;
        }

        if (!'Notification' in window) {
            console.warn('Notifications are not supported in this browser');
            return;
        } else {
            Notification.requestPermission(() => {
                var notification = new Notification(object.title, {
                    body: object.body,
                    dir: 'auto'
                });

                setTimeout(function () {
                    notification.close();
                }, object.delay || 3000)
            });
        }
    }
}

export { Notify };