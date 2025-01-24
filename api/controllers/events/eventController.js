import { Event } from "../../models/event/event";
import { validateMongodbID } from "../../utils/validateMongodbID";
// !====================================================
// get events
// !====================================================
export const getAllEventsController = async (req, res) => {
  try {
    const events = await Event.find({}).populate("user");
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error });
  }
};

// !====================================================
// create post
// !====================================================
export const createEventController = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: "Error creating event", error });
  }
};

// !====================================================
// fetch a single post
// !====================================================
export const getEventController = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id).populate("user");
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Error fetching event", error });
  }
};

// !====================================================
// update post
// !====================================================
export const updatePostController = async (req, res) => {
  const { id } = req.params;
  validateMongodbID(id);
  try {
    const updatedPostData = {
      user: req.user?.id,
      title: req.body.title,
      image: req.body.image,
      description: req.body.description,
      cardDescription: req.body.cardDescription,
      date: req.body.date,
      location: req.body.location,
    };

    const data = await Event.findByIdAndUpdate(id, updatedPostData, {
      new: true,
    });
    res.json(data);
  } catch (error) {
    res.json(error);
  }
};
// !====================================================
// delete post
// !====================================================
export const deleteEventController = async (req, res) => {
  const { id } = req.params;
  try {
    await Event.findByIdAndDelete(id);
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", error });
  }
};
