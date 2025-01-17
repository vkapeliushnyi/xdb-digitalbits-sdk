/**
 * Problem: xdb-digitalbits-sdk doesn't depend on browser env but the types do.
 * Workaround: Copy/paste subset of interfaces from `dom.d.ts` (TS v3.4.5):
 * - `MessageEvent` already comes from `eventsource`.
 * - `EventListener` used at `src/call_builder.ts`.
 * - `EventSource` used at `src/call_builder.ts`.
 */

interface EventSourceEventMap {
  error: Event;
  message: MessageEvent;
  open: Event;
}

interface EventSource extends EventTarget {
  onerror: ((this: EventSource, ev: Event) => any) | null;
  onmessage: ((this: EventSource, ev: MessageEvent) => any) | null;
  onopen: ((this: EventSource, ev: Event) => any) | null;
  /**
   * Returns the state of this EventSource object's connection. It can have the
   * values described below.
   */
  readonly readyState: number;
  /**
   * Returns the URL providing the event stream.
   */
  readonly url: string;
  /**
   * Returns true if the credentials mode
   * for connection requests to the URL providing the
   * event stream is set to "include", and false otherwise.
   */
  readonly withCredentials: boolean;
  readonly CLOSED: number;
  readonly CONNECTING: number;
  readonly OPEN: number;
  close(): void;
  addEventListener<K extends keyof EventSourceEventMap>(
    type: K,
    listener: (this: EventSource, ev: EventSourceEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions,
  ): void;
  addEventListener(
    type: string,
    listener: EventListener | EventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ): void;
  removeEventListener<K extends keyof EventSourceEventMap>(
    type: K,
    listener: (this: EventSource, ev: EventSourceEventMap[K]) => any,
    options?: boolean | EventListenerOptions,
  ): void;
  removeEventListener(
    type: string,
    listener: EventListener | EventListenerObject,
    options?: boolean | EventListenerOptions,
  ): void;
}

interface EventListener {
  // tslint:disable-next-line: callable-types
  (evt: Event): void;
}

interface EventListenerObject {
  handleEvent(evt: Event): void;
}

interface EventListenerOptions {
  capture?: boolean;
}

interface AddEventListenerOptions extends EventListenerOptions {
  once?: boolean;
  passive?: boolean;
}

/** EventTarget is an interface implemented by objects that can receive events and may have listeners for them. */
interface EventTarget {
  /**
   * Appends an event listener for events whose type attribute value is type. The callback argument sets the callback that will be invoked when the event is dispatched.
   * The options argument sets listener-specific options. For compatibility this can be a
   * boolean, in which case the method behaves exactly as if the value was specified as options's capture.
   * When set to true, options's capture prevents callback from being invoked when the event's eventPhase attribute value is BUBBLING_PHASE. When false (or not present), callback will not be invoked when event's eventPhase attribute value is CAPTURING_PHASE. Either way, callback will be invoked if event's eventPhase attribute value is AT_TARGET.
   * When set to true, options's passive indicates that the callback will not cancel the event by invoking preventDefault(). This is used to enable performance optimizations described in §2.8 Observing event listeners.
   * When set to true, options's once indicates that the callback will only be invoked once after which the event listener will
   * be removed.
   * The event listener is appended to target's event listener list and is not appended if it has the same type, callback, and capture.
   */
  addEventListener(
    type: string,
    listener: EventListener | EventListenerObject | null,
    options?: boolean | AddEventListenerOptions,
  ): void;
  /**
   * Dispatches a synthetic event event to target and returns true
   * if either event's cancelable attribute value is false or its preventDefault() method was not invoked, and false otherwise.
   */
  dispatchEvent(event: Event): boolean;
  /**
   * Removes the event listener in target's event listener list with the same type, callback, and options.
   */
  removeEventListener(
    type: string,
    callback: EventListener | EventListenerObject | null,
    options?: EventListenerOptions | boolean,
  ): void;
}

/** The Event interface represents any event which takes place in the DOM; some are user-generated (such as mouse or keyboard events), while others are generated by APIs (such as events that indicate an animation has finished running, a video has been paused, and so forth). While events are usually triggered by such "external" sources, they can also be triggered programmatically, such as by calling the HTMLElement.click() method of an element, or by defining the event, then sending it to a specified target using EventTarget.dispatchEvent(). There are many types of events, some of which use other interfaces based on the main Event interface. Event itself contains the properties and methods which are common to all events. */
interface Event {
  // Already partially declared at `@types/eventsource/dom-monkeypatch.d.ts`.

  /**
   * Returns the object whose event listener's callback is currently being
   * invoked.
   */
  readonly currentTarget: EventTarget | null;
  /** @deprecated */
  readonly srcElement: EventTarget | null;
  /**
   * Returns the object to which event is dispatched (its target).
   */
  readonly target: EventTarget | null;
  composedPath(): EventTarget[];
}
