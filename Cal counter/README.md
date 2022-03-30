Distinctiveness:
This project is a variant on a calorie tracker application. 
It has a date/calendar selection, a Search bar and a Chart plotter. These components I belive didn't exist in the previous projects in this course with the social network, mail or web auction applications.

Complexity:
I took an extra step and read up on and watch some lectures on the React framework. This is project used React, Axios, Django + REST framework. 

It took quite abit of time to get the hang of React and basic principles of it. 

One big issue i never got the hang of was Login/authenticate function. It differed quite alot from Normal Django-Javascript previously in the course. Never managed to fix properly. 



Files:

tracker: has the django and python contents. Had to modfiy abit in the settings. Followed this page:
https://www.geeksforgeeks.org/how-to-connect-django-with-reactjs/

    models: 
        databses for users, foods, entries.

    Views: 
        The python django backend, is pretty simple. Some views for getting data, posting entries, updating entries and deleting entries. 

        The get function uses simple multiplier from different models to get the desired sum before sending it back.


tracker-app: React files. 
    Addbutton: 
        just structure settings on the add entry buttons

    App: 
        general App strucutre. 
    
        the Addentry, edit and delete function probably not the prettiest way of doing it in react. Will pick some data out of the DOM. Not sure how to do it otherwise

            Addentry: 
            takes the info from the <Search/> module and stores it in state. Then sends a post request to database to store. After re-lot chart. Different buttons in the DOM feed different "types" 

            handledelete: 
            first ask for confirmation.

            then take a unique entryid from dom, that is available there since unique entry id is fetched in state already.

            take this entry id and delete in backend. 

            handleEdit1:
            take the clicked id, make it to a form. hide previous.

            handleEdit2:
            Take the submitted info, change the state info.
            Take the unique entry id, the new quantity and do a PUT request into backend. 

    
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

        Could probably be alot better done since it will just show alot of infomration in the DOM that App later will take. It was one of the earlier Modules so mabye it can be redone to just send information between states.
    
    Summary:
        Will summarize the totals of each entry. Basically caluclating some constants and then the structure aswell.


How to run:

I don't know exactly how many steps you need to copy to just be able to run Django REST framework, React and axios.

I followed this page to get it started
https://www.geeksforgeeks.org/how-to-connect-django-with-reactjs/



