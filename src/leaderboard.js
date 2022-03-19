
export default class Player {

    constructor ()
    {   
                              ///at this stage, the class would interact with SQL
                              ///to request the leaderboard data, but i have been unable
                              ///to accomplish SQL interfacing with javascript.
        
                              ///lets assume we interfaced the SQL and we retrieved a set
                              ///of leaderboard 
        let leaderboard = {keys:   ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j","k"], 
                            values: [134, 144, 154, 124, 125, 126, 167, 133, 145, 125,234]};
        
        let leaderboardscores = this.mergeSort(leaderboard.values);
        ///with this algorithm, if there are duplicate keys, it wont matter.
        
        this.sortedleaderboard = {keys: [], values: []};
        let i = 0;

        leaderboardscores.forEach(value => {
           ///for each value, find value in leaderboard.value list, 
           ///get its id and then get the key with that id and insert into sorted leaderboard
           i = leaderboard.values.findIndex(valuein => valuein === value);

           this.sortedleaderboard.keys.push(leaderboard.keys[i]);
           this.sortedleaderboard.values.push(leaderboard.values[i]);
           leaderboard.keys[i] = 0;
           leaderboard.values[i] = 0;

        });

    }

    mergeSort(input)
        {    ///initial function
        if (input.length <= 1){   ///BASE CASE. 
            return input;         ///when enough stacks are called each splitting the input list, 
        }                         ///it will eventually narrow down to 1 object in the input list in which the base case is true.
                                  ///
    
        ///left list will contain the left split of each input recursion.
        let left = []; 
        let right = [];
        ///right list will contain the right split of each input recursion.
        /// (think of the tree)
        
        let i = 1; for (const object of input){   ///loops through every object in the input list alongside index i which increments.
            if (i < Math.floor(input.length+1)/2){///the input list gets split in the midpoint floored to the nearest integer.
                left.push(object);                 ///the i of object came before the mid, the left side split goes to the left list.
            }
            else{                                   
                right.push(object);                ///the i of object came after the mid, the right side split goes to the right list.
            }
            i++                                   ///increment i for next loop
        }
        left = this.mergeSort(left);  ///recursively sort the sublists.
        right = this.mergeSort(right);
     
        return this.merge(left, right)///this will merge the now sorted sublists.
    }
    
    merge(left, right){ ///secondary vital function, does the merging of sublists once the basecase has been reached
        let result = []; ///this will be the final output of program onec all the sublists have merged
     
        while ((left.length > 0) && (right.length > 0)){
            if(left[0] <= right[0]){  ///this comparative handles the sorting. it chooses to either push left or right to the result list.
                result.push(left[0]); ///if left is greater or equal to the right it gets pushed to the result list.
                left.shift();         ///the left is shifted so that only the rest of the list aside of [0] remain. 
            }
            else{
                result.push(right[0]);///alternatively the right will get added to the results if it is bigger
                right.shift();///the right is shifted so that only the rest of the list aside of [0] remain. 
            }///THIS COMPARATIVE DICTATES THE SORT ORDER. <= ascending >= descending
        }
        while (left.length > 0){ ///consumes the rest of the left list which remains for odd lists
            result.push(left[0]);
            left.shift();
        }
        while (right.length > 0){///same for the right list which remains
            result.push(right[0]);
            right.shift();
        } 
        
        return result; ///returns result of the merge back to mergesort.
    }
    
    getScores()
    {
        return this.sortedleaderboard;
    }
    

}
