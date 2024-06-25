import OT from '@opentok/client';

let session: OT.Session;
let publisher: OT.Publisher;

export const initializeSession = (apiKey: string, sessionId: string, token: string): void => {
  session = OT.initSession(apiKey, sessionId);

  session.on('streamCreated', (event: OT.StreamEvent) => {
    const subscriberOptions: OT.SubscriberProperties = {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    };
    session.subscribe(event.stream, 'subscriber', subscriberOptions, handleError);
  });

  session.connect(token, (error: OT.OTError | undefined) => {
    if (error) {
      handleError(error);
    } else {
      const publisherOptions: OT.PublisherProperties = {
        insertMode: 'append',
        width: '100%',
        height: '100%'
      };
      publisher = OT.initPublisher('publisher', publisherOptions, handleError);
      session.publish(publisher, handleError);
    }
  });
};

export const disconnectSession = (): void => {
  if (session) {
    session.disconnect();
  }
};

export const toggleVideo = (enable: boolean): void => {
  if (publisher) {
    publisher.publishVideo(enable);
  }
};

export const toggleAudio = (enable: boolean): void => {
  if (publisher) {
    publisher.publishAudio(enable);
  }
};

const handleError = (error: OT.OTError | undefined) => {
  if (error) {
    console.error('Vonage Error: ', error.message);
  }
};

// Add more Vonage-related functions as needed