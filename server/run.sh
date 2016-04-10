#/bin/sh


out="$(chom database fetch -m 0 -c politicians -C)"

IFS=$'\n' read -rd '' -a y <<< "$out"

re='"twitterid":"([^"]+)"'
twitterids=()
for i in "${y[@]}"
do
   [[ $i =~ $re ]]
   ret="$(echo ${BASH_REMATCH[1]} | tr '[:upper:]' '[:lower:]')"
    if [ -n "$ret" ]; then
   		twitterids+=($ret)
	fi
done

politician_group_0=""
politician_group_1=""
politician_group_2=""
politician_group_3=""
index=0
for i in "${twitterids[@]}"
do
	if [[ $(( index % 4 )) == 0 ]];  then
		politician_group_0=$politician_group_0$i,
	elif [[ $(( index % 4 )) == 1 ]];  then
		politician_group_1=$politician_group_1$i,
	elif [[ $(( index % 4 )) == 2 ]];  then
		politician_group_2=$politician_group_2$i,
	elif [[ $(( index % 4 )) == 3 ]];  then
		politician_group_3=$politician_group_3$i,
	fi
	let index=index+1
done

start_streaming(){
	exec=""
	exec+="chom fetch stream -k $1 | "
	exec+="chom sentiment | "
	exec+="chom summary -f sentiment -d 8 | "
	exec+="chom run -c \"datum.expireAt=new Date(+datum.date+400*Math.pow(4,datum.depth)*1000)\" | "
	exec+="chom database set -m 0 -c summary -k depth,twitter_handle,date --save-interval 10000"
	echo $exec
	eval $exec
}

#
#
if   [[ $1 == 0 ]];  then
	start_streaming $politician_group_0
elif [[ $1 == 1 ]];  then
	start_streaming $politician_group_1
elif [[ $1 == 2 ]];  then
	start_streaming $politician_group_2
elif [[ $1 == 3 ]];  then
	start_streaming $politician_group_3
fi

echo "Script has ended. Good bye!"