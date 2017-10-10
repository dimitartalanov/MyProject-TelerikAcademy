import dbModel from 'db-model';
import templates from 'templates';
import stylingsTemplate from 'stylings-templates';
import events from 'events';
class DbController {
  load(template) {
    templates.load(template).then(templateHTML => {
      stylingsTemplate.template(template, templateHTML);

      events.unbindScrollEvent();

    });
  }
  getAllInCategory(template, dbCategory, scrollEvent) {

    let displayItems;

    dbModel.getItems(dbCategory, scrollEvent).then((res) => {

      displayItems = res[dbCategory];
      if (template === 'posts') {
        displayItems.page = scrollEvent;
      }

      return templates.load(template);
    }).then((templateHTML) => {

      stylingsTemplate.template(template, templateHTML, displayItems);

    });
  }
  getPostId(template, dbCategory, id) {

    let displayItems;

    dbModel.getById(dbCategory, id).then((res) => {

      displayItems = res[dbCategory];

      return templates.load(template);
    }).then((templateHTML) => {

      stylingsTemplate.template(template, templateHTML, displayItems);

      events.commentEvent();
      events.unbindScrollEvent();
    });
  }
  userComment(comment, id) {

    dbModel.saveUserComment(comment, id);
    window.location.href = (`#/posts/post/${id}`);
    location.reload();

  }
  getUser(template) {
    let displayItems
    dbModel.userProfile().then((res) => {
      displayItems = res;

      return templates.load(template);
    }).then((templateHTML) => {
      stylingsTemplate.template(template, templateHTML, displayItems);
      events.unbindScrollEvent();
    })
  }
}

const dbController = new DbController();
export default dbController;