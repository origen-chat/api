declare const self: any;

export default function handlePush(event: any): void {
  const notificationTitle = 'Test';
  const notificationOptions = {
    body: 'Test',
  };

  const notificationPromise = self.registration.showNotification(
    notificationTitle,
    notificationOptions,
  );

  event.waitUntil(notificationPromise);
}
