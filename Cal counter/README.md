This project is a variant on a calorie tracker application that initially was made for a school project with React/JavaScript front-end and Python Django back-end

The project didn't require it but for this project I read up and implemented the React library, Axios and Django REST framework. This means its also the first project I've done in React, the info from youtube lectures and problem solving online webpages.

The main components are a date/calendar selection, a Search bar and a Chart plotter. 

One big issue i never got the hang of was Login/authenticate function. It differed quite alot from Normal Django-Javascript previously in the course. Never managed to fix properly. 

Files:

cal_tracker_backen: has the django and python contents. Had to modfiy abit in the settings. Followed this page:
https://www.geeksforgeeks.org/how-to-connect-django-with-reactjs/

    models: 
        databses for users, foods, entries.

    Views: 
        The python django backend has some views for getting data, posting entries, updating entries and deleting entries. Alot of it is just getting the right format for the REST API

        The get function uses simple multiplier from different models to get the desired sum before sending it back.


cal_tracker_frontend: React files. 
   
    components:

        Addbutton: 
            just structure settings on the add entry buttons
        
        Datehandler, handleSelect and handlechart: 
        functions that does stuff to update Date, Select in the calendar. Update the chart.
            
            Datehandler:
            will fetch the data from backend with the selected date in the <Date/> module. Plot this information after fetch.

            handleSelect:
            So this is because the calendar and <Date/> module is triggered on a "onSelect" function. So when loading the page, the function is run to just "click" the calendar couple of times automatically and exit the loop when it has clicked. This is due to sometimes it was buggy and didnt want to auto load when just clicking once. Not so pretty but don't know how to do it otherwise :(

            This function will be run with the React lifecycle trigger "componentDidMount". Which is when the app is loaded first time.

            handleChart:
            The function that will update the state which stores information for the pie <Chart/> module. this is called in some of the other functions. The chart module is a mapping of the state.

        Chart:
        Chart module, that i got from Rechart. Will take state and map into diagram. Can be buggy with the % labels inside the diagram for some reason i cant figure out. 
        https://recharts.org/en-US/

        Date:
            Date module, handle the calendar and feed right date to App so it can fetch data from the right date. Sometimes has buggy selection property, sometimes not...

        Entryheader:
            just DOM structure so it doesnt need to be seen in App.
        
        Login:
            login function that ended up not working properly. Now it just saves an id /username in local storage. 

        Meallist: 
            structure module with props to show correct information in the 4 different meals. Also has edit and delete props.

        Search:
            Searchbar and food information div. 
            
            Pretty advanced filter + map function of the fooddatabase, that i found and adapted from an online page (info in module)

            Send info back to App through props when clicking on the "add to certain meal" button

        Summary:
            Will summarize the totals of each entry. Basically caluclating some constants and then the structure aswell.     

    App: 
        general App strucutre. 
    
        the edit and delete function probably not the prettiest way of doing it in react. Will pick some data out of the DOM. Not sure how to do it otherwise

            Addentry: 
            gets info from the <Search/> module and stores it in state. Then sends a post request to database to store. After re-plot chart. 

            handledelete: 
            first ask for confirmation.

            then take a unique entryid from dom, that is available there since unique entry id is fetched in state already.

            take this entry id and delete in backend. 

            handleEdit1:
            take the clicked id, make it to a form. hide previous.

            handleEdit2:
            Take the submitted info, change the state info.
            Take the unique entry id, the new quantity and do a PUT request into backend. 

How to run:

I don't know exactly how many steps you need to copy to just be able to run Django REST framework, React and axios.

I followed this page to get it started
https://www.geeksforgeeks.org/how-to-connect-django-with-reactjs/



